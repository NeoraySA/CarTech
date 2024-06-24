const pool = require('../database');
const { eachDayOfInterval, isSaturday, subDays, format } = require('date-fns');

async function calculateRentalAvailability(startDate, endDate, companyId, branchId, isNewDriver, isYoungDriver) {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const days = eachDayOfInterval({ start, end: subDays(end, 1) }); 
    const saturdays = days.filter(day => isSaturday(day)).length;

    const [holidays] = await pool.query('SELECT date FROM jewish_holidays');
    const holidayDates = holidays.map(holiday => new Date(holiday.date));
    const holidaysInRange = holidayDates.filter(holidayDate => holidayDate >= start && holidayDate <= end).length;

    const saturdaysAndHolidays = saturdays + holidaysInRange;
    const weekdays = days.length - saturdaysAndHolidays;

    const [availableCars] = await pool.query(`
      SELECT c.id, c.license_number, c.make, c.model, c.color, c.year, c.current_km, c.current_fuel_level, c.image_url, cc.category_id, cc.km_limit_per_unit, cc.price_per_day, cc.saturday_holiday_price, cc.extra_km_price, cc.new_driver_price_increase, cc.young_driver_price_increase
      FROM cars c
      JOIN car_categories cc ON c.category = cc.category_id
      WHERE c.is_available = 1
      AND c.company_id = ?
      AND c.branch_id = ?
    `, [companyId, branchId]);

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

      const totalKmLimit = kmLimitPerUnit * weekdays;
      let totalPrice = (pricePerDay * weekdays) + (saturdayHolidayPrice * saturdaysAndHolidays);
      let additionalCost = 0;

      // הוספת תוספת מחיר עבור נהג חדש או צעיר
      if (isNewDriver) {
        additionalCost += newDriverPriceIncrease * weekdays;
      }
      if (isYoungDriver) {
        additionalCost += youngDriverPriceIncrease * weekdays;
      }

      totalPrice += additionalCost;

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
        additionalCost // תוספת מחיר עבור נהג חדש וצעיר
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
