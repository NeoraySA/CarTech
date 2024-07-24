const pool = require('../database');
const { eachDayOfInterval, isSaturday, subDays, isWithinInterval } = require('date-fns');

async function calculateRentalAvailability(startDate, endDate, companyId, branchId, isNewDriver, isYoungDriver) {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const days = eachDayOfInterval({ start, end: subDays(end, 1) });

    // חישוב ימי השבת וימי החול
    let saturdays = 0;
    let weekdays = 0;

    days.forEach(day => {
      if (isSaturday(day)) {
        saturdays++;
      } else {
        weekdays++;
      }
    });

    console.log(`Initial calculation - Weekdays: ${weekdays}, Saturdays: ${saturdays}`);

    const [holidays] = await pool.query('SELECT date FROM jewish_holidays');
    const holidayDates = holidays.map(holiday => new Date(holiday.date));
    const holidaysInRange = holidayDates.filter(holidayDate => isWithinInterval(holidayDate, { start, end: subDays(end, 1) }));

    holidaysInRange.forEach(holiday => {
      console.log(`Holiday: ${holiday}`);
    });

    const saturdaysAndHolidays = saturdays + holidaysInRange.length;
    weekdays -= holidaysInRange.length;

    // הדפסה לטרמינל של ימי החול וימי השבת לאחר הוספת חגים
    console.log(`After holidays calculation - Weekdays: ${weekdays}, Saturdays: ${saturdays}`);

    const [categoryRateDetails] = await pool.query(`
      SELECT *
      FROM category_rate_details
      WHERE category_id IN (SELECT category_id FROM car_categories WHERE company_id = ? AND branch_id = ?)
      AND rate_type_id = 1
    `, [companyId, branchId]);

    const categoryRateMap = categoryRateDetails.reduce((acc, rateDetail) => {
      acc[rateDetail.category_id] = rateDetail;
      return acc;
    }, {});

    // הדפסה של כל הנתונים מהטבלה category_rate_details
    console.log('Category Rate Details:', categoryRateDetails);

    const [availableCars] = await pool.query(`
      SELECT c.id, c.license_number, c.make, c.model, c.color, c.year, c.current_km, c.current_fuel_level, c.image_url, cc.category_id
      FROM cars c
      JOIN car_categories cc ON c.category = cc.category_id
      WHERE c.is_available = 1
      AND c.company_id = ?
      AND c.branch_id = ?
    `, [companyId, branchId]);

    const carDetails = availableCars.map(car => {
      const categoryRates = categoryRateMap[car.category_id];

      if (!categoryRates) {
        return null; // לדלג על קטגוריות שאין להן תעריפים מוגדרים
      }

      // הדפסה של כל הנתונים עבור קטגוריה ספציפית
      console.log(`Category Rates for Car ID ${car.id}:`, categoryRates);

      const kmLimitPerUnit = parseFloat(categoryRates.km_limit_per_unit) || 0;
      console.log(`Car ID: ${car.id}, Km Limit Per Unit: ${kmLimitPerUnit}`); // הדפסה לבדיקת ערך הק"מ ליחידה
      const saturdayKmIncluded = categoryRates.saturday_km_included;

      let totalKmLimit = kmLimitPerUnit * (weekdays + (saturdayKmIncluded ? saturdays : 0));
      let kmUnits = weekdays + (saturdayKmIncluded ? saturdays : 0);

      // הדפסה לטרמינל של חישוב הק"מ
      console.log(`Car ID: ${car.id}, Total Km Limit: ${totalKmLimit}, Km Units: ${kmUnits}`);

      return {
        ...car,
        totalKmLimit: isNaN(totalKmLimit) ? 0 : totalKmLimit,
        kmLimitPerUnit: isNaN(kmLimitPerUnit) ? 0 : kmLimitPerUnit,
        kmUnits: isNaN(kmUnits) ? 0 : kmUnits,
        extraKmPrice: parseFloat(categoryRates.extra_km_price) || 0,
      };
    }).filter(car => car !== null);

    const [specialRates] = await pool.query(`
      SELECT * FROM special_rates WHERE category_id IN (
        SELECT category_id FROM car_categories WHERE company_id = ? AND branch_id = ?
      )
    `, [companyId, branchId]);

    const [rateTypes] = await pool.query('SELECT * FROM rate_types');
    const rateTypeMap = rateTypes.reduce((acc, rateType) => {
      acc[rateType.id] = rateType.rate_type;
      return acc;
    }, {});

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

    const updatedCarDetails = carDetails.map(car => {
      const categoryRates = categoryRateMap[car.category_id];

      if (!categoryRates) {
        return null; // לדלג על קטגוריות שאין להן תעריפים מוגדרים
      }

      const pricePerDay = parseFloat(categoryRates.price) || 0;
      const saturdayHolidayPrice = parseFloat(categoryRates.saturday_holiday_price) || 0;
      const extraKmPrice = parseFloat(categoryRates.extra_km_price) || 0;
      const newDriverPriceIncrease = parseFloat(categoryRates.new_driver_price_increase) || 0;
      const youngDriverPriceIncrease = parseFloat(categoryRates.young_driver_price_increase) || 0;
      const saturdayRegularCharge = categoryRates.saturday_regular_charge;

      let totalPrice = 0;
      let ratesDetailsMap = {};

      // חישוב התעריפים
      days.forEach(day => {
        let rateName = null;
        let baseRateTotal = 0;
        let isSpecialRateApplied = false;

        // בדיקה אם יש תעריף מיוחד ליום הנוכחי
        specialRates.forEach(rate => {
          if (car.category_id === rate.category_id && isWithinInterval(day, { start: new Date(rate.start_date), end: new Date(rate.end_date) })) {
            if (isSaturday(day) && !rate.include_saturday_holiday) {
              return; // לדלג על תעריף מיוחד זה אם שבת לא כלולה
            }
            rateName = rate.rate_name;
            baseRateTotal = parseFloat(rate.daily_rate) || 0;
            isSpecialRateApplied = true;
          }
        });

        // אם אין תעריף מיוחד, לבדוק תעריף רגיל
        if (!isSpecialRateApplied) {
          if (isSaturday(day)) {
            if (saturdayRegularCharge) {
              rateName = rateTypeMap[1];
              baseRateTotal = pricePerDay;
            } else {
              rateName = 'תעריף שבת';
              baseRateTotal = saturdayHolidayPrice;
            }
          } else {
            rateName = rateTypeMap[1];
            baseRateTotal = pricePerDay;
          }
        }

        if (!ratesDetailsMap[rateName]) {
          ratesDetailsMap[rateName] = { quantity: 0, total: 0, daily_rate: baseRateTotal };
        }
        ratesDetailsMap[rateName].quantity += 1;
        ratesDetailsMap[rateName].total += baseRateTotal;
        totalPrice += baseRateTotal;
      });

      const ratesDetails = Object.keys(ratesDetailsMap).map(rateName => ({
        rate_name: rateName,
        quantity: ratesDetailsMap[rateName].quantity,
        total: ratesDetailsMap[rateName].total,
        daily_rate: ratesDetailsMap[rateName].daily_rate
      }));

      return {
        ...car,
        pricePerDay,
        saturdayHolidayPrice,
        extraKmPrice,
        newDriverPriceIncrease,
        youngDriverPriceIncrease,
        saturdayRegularCharge,
        totalPrice,
        ratesDetails,
        toll_fee,
        traffic_fee,
        vat_percentage,
      };
    }).filter(car => car !== null);

    // מיון התוצאות לפי מחיר כולל מהזול ליקר
    updatedCarDetails.sort((a, b) => a.totalPrice - b.totalPrice);

    return {
      startDate,
      endDate,
      totalDays: days.length,
      saturdays,
      weekdays,
      cars: updatedCarDetails,
      driverType // סוג הנהג שנשלח
    };
  } catch (error) {
    console.error('Error calculating rental availability:', error);
    throw error;
  }
}

module.exports = calculateRentalAvailability;
