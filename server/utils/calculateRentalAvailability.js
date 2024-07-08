const pool = require('../database');
const { eachDayOfInterval, isSaturday, subDays, format, isWithinInterval } = require('date-fns');

async function calculateRentalAvailability(startDate, endDate, companyId, branchId, isNewDriver, isYoungDriver) {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const days = eachDayOfInterval({ start, end: subDays(end, 1) });
    const saturdays = days.filter(day => isSaturday(day)).length;

    const [holidays] = await pool.query('SELECT date FROM jewish_holidays');
    const holidayDates = holidays.map(holiday => new Date(holiday.date));
    const holidaysInRange = holidayDates.filter(holidayDate => holidayDate >= start && holidayDate <= end);

    const saturdaysAndHolidays = saturdays + holidaysInRange.length;
    const weekdays = days.length - saturdaysAndHolidays;

    // Get special rates
    const [specialRates] = await pool.query(`
      SELECT * FROM special_rates WHERE category_id IN (
        SELECT category_id FROM car_categories WHERE company_id = ? AND branch_id = ?
      )
    `, [companyId, branchId]);

    // Get rate types
    const [rateTypes] = await pool.query('SELECT * FROM rate_types');
    const rateTypeMap = rateTypes.reduce((acc, rateType) => {
      acc[rateType.id] = rateType.rate_type;
      return acc;
    }, {});

    // Get available cars
    const [availableCars] = await pool.query(`
      SELECT c.id, c.license_number, c.make, c.model, c.color, c.year, c.current_km, c.current_fuel_level, c.image_url, cc.category_id, cc.km_limit_per_unit, cc.price_per_day, cc.saturday_holiday_price, cc.extra_km_price, cc.new_driver_price_increase, cc.young_driver_price_increase, cc.include_new_young_driver_on_saturday_holiday
      FROM cars c
      JOIN car_categories cc ON c.category = cc.category_id
      WHERE c.is_available = 1
      AND c.company_id = ?
      AND c.branch_id = ?
    `, [companyId, branchId]);

    // Get settings
    const [settings] = await pool.query('SELECT * FROM settings WHERE company_id = ? AND branch_id = ?', [companyId, branchId]);
    const toll_fee = parseFloat(settings[0].toll_fee) || 0;
    const traffic_fee = parseFloat(settings[0].traffic_fee) || 0;
    const vat_percentage = parseFloat(settings[0].vat_percentage) || 0;

    let driverType = 'נהג ותיק';
    if (isNewDriver && isYoungDriver) {
      driverType = 'נהג חדש וצעיר';
    } else if (isNewDriver) {
      driverType = 'נהג חדש';
    } else if (isYoungDriver) {
      driverType = 'נהג צעיר';
    }

    const carDetails = availableCars.map(car => {
      const kmLimitPerUnit = parseFloat(car.km_limit_per_unit) || 0;
      const pricePerDay = parseFloat(car.price_per_day) || 0;
      const saturdayHolidayPrice = parseFloat(car.saturday_holiday_price) || 0;
      const extraKmPrice = parseFloat(car.extra_km_price) || 0;
      const newDriverPriceIncrease = parseFloat(car.new_driver_price_increase) || 0;
      const youngDriverPriceIncrease = parseFloat(car.young_driver_price_increase) || 0;
      const includeNewYoungDriverOnSaturdayHoliday = car.include_new_young_driver_on_saturday_holiday;

      let totalKmLimit = kmLimitPerUnit * weekdays;
      let totalPrice = 0;
      let additionalCost = 0;
      let ratesDetailsMap = {};

      // חישוב התעריפים
      days.forEach(day => {
        let isSpecialRateApplied = false;
        specialRates.forEach(rate => {
          if (car.category_id === rate.category_id && isWithinInterval(day, { start: new Date(rate.start_date), end: new Date(rate.end_date) })) {
            const rateName = rate.rate_name;
            const baseRateTotal = parseFloat(rate.daily_rate);
            let useSpecialRate = true;

            // בדיקה אם צריך להחיל תעריף מיוחד ביום שבת/חג
            if ((isSaturday(day) || holidaysInRange.some(holiday => isWithinInterval(day, { start: holiday, end: holiday }))) && !rate.include_saturday_holiday) {
              useSpecialRate = false;
            }

            if (useSpecialRate) {
              if (!ratesDetailsMap[rateName]) {
                ratesDetailsMap[rateName] = { quantity: 0, total: 0, daily_rate: baseRateTotal };
              }
              ratesDetailsMap[rateName].quantity += 1;
              ratesDetailsMap[rateName].total += baseRateTotal;
              totalPrice += baseRateTotal;
              isSpecialRateApplied = true;
            }
          }
        });

        if (!isSpecialRateApplied) {
          let rateTypeId = 1;
          let baseRateTotal = pricePerDay;

          if (isSaturday(day) || holidaysInRange.some(holiday => isWithinInterval(day, { start: holiday, end: holiday }))) {
            rateTypeId = 7;
            baseRateTotal = saturdayHolidayPrice;
          }

          const rateName = rateTypeMap[rateTypeId];
          if (!ratesDetailsMap[rateName]) {
            ratesDetailsMap[rateName] = { quantity: 0, total: 0, daily_rate: baseRateTotal };
          }
          ratesDetailsMap[rateName].quantity += 1;
          ratesDetailsMap[rateName].total += baseRateTotal;
          totalPrice += baseRateTotal;
        }
      });

      // הוספת רשומה נוספת לפירוט התעריפים עבור תוספת נהג חדש או צעיר בימים שאינם שבת או חג
      if (isNewDriver) {
        const newDriverRateName = 'תוספת נהג חדש';
        const applicableDays = includeNewYoungDriverOnSaturdayHoliday ? days.length : weekdays;
        if (!ratesDetailsMap[newDriverRateName]) {
          ratesDetailsMap[newDriverRateName] = { quantity: 0, total: 0, daily_rate: newDriverPriceIncrease };
        }
        ratesDetailsMap[newDriverRateName].quantity += applicableDays;
        ratesDetailsMap[newDriverRateName].total += newDriverPriceIncrease * applicableDays;
        totalPrice += newDriverPriceIncrease * applicableDays; // חישוב בסכום הכולל
      }

      if (isYoungDriver) {
        const youngDriverRateName = 'תוספת נהג צעיר';
        const applicableDays = includeNewYoungDriverOnSaturdayHoliday ? days.length : weekdays;
        if (!ratesDetailsMap[youngDriverRateName]) {
          ratesDetailsMap[youngDriverRateName] = { quantity: 0, total: 0, daily_rate: youngDriverPriceIncrease };
        }
        ratesDetailsMap[youngDriverRateName].quantity += applicableDays;
        ratesDetailsMap[youngDriverRateName].total += youngDriverPriceIncrease * applicableDays;
        totalPrice += youngDriverPriceIncrease * applicableDays; // חישוב בסכום הכולל
      }

      const ratesDetails = Object.keys(ratesDetailsMap).map(rateName => ({
        rate_name: rateName,
        quantity: ratesDetailsMap[rateName].quantity,
        total: ratesDetailsMap[rateName].total,
        daily_rate: ratesDetailsMap[rateName].daily_rate
      }));

      return {
        id: car.id,
        license_number: car.license_number,
        make: car.make,
        model: car.model,
        color: car.color,
        year: car.year,
        current_km: car.current_km,
        current_fuel_level: car.current_fuel_level,
        image_url: car.image_url,
        totalDays: days.length,
        saturdaysAndHolidays,
        weekdays,
        kmLimitPerUnit,
        totalKmLimit,
        extraKmPrice,
        pricePerDay, // מחיר יומי
        saturdayHolidayPrice, // מחיר עבור שבת או חג
        newDriverPriceIncrease,
        youngDriverPriceIncrease,
        totalPrice,
        additionalCost, // תוספת מחיר עבור נהג חדש וצעיר
        kmUnits: weekdays, // מספר יחידות ק"מ
        ratesDetails, // פרטי התעריפים
        toll_fee, // עלות עמלה בכבישי אגרה
        traffic_fee, // עלות עמלה בטיפול בדוחות
        vat_percentage
      };
    });

    // מיון התוצאות לפי מחיר כולל מהזול ליקר
    carDetails.sort((a, b) => a.totalPrice - b.totalPrice);

    return {
      startDate,
      endDate,
      totalDays: days.length,
      saturdays,
      weekdays,
      cars: carDetails,
      driverType // סוג הנהג שנשלח
    };
  } catch (error) {
    console.error('Error calculating rental availability:', error);
    throw error;
  }
}

module.exports = calculateRentalAvailability;
