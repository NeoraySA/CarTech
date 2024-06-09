const pool = require('../database');
const { eachDayOfInterval, isSaturday, subDays, format } = require('date-fns');

async function calculateRentalDetails(startDate, endDate, carId, companyId, branchId) {
  try {
    console.log(`Calculating details for carId: ${carId} from ${startDate} to ${endDate}`);
    
    // הפיכת תאריכים לאובייקטים של Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // חישוב ימי השבת
    const days = eachDayOfInterval({ start, end: subDays(end, 1) }); // להחסיר יום אחד מהתאריך הסופי עבור הטווח
    const saturdays = days.filter(day => isSaturday(day)).length;

    // חישוב ימי החגים
    const [holidays] = await pool.query('SELECT date FROM jewish_holidays');
    const holidayDates = holidays.map(holiday => new Date(holiday.date));
    const holidaysInRange = holidayDates.filter(holidayDate => holidayDate >= start && holidayDate <= end).length;

    // חישוב ימי חול
    const saturdaysAndHolidays = saturdays + holidaysInRange;
    const weekdays = days.length - saturdaysAndHolidays;

    // שליפת הקטגוריה של הרכב
    const [carCategoryResult] = await pool.query('SELECT category FROM cars WHERE id = ?', [carId]);
    if (carCategoryResult.length === 0) {
      throw new Error(`Car with id ${carId} not found`);
    }
    const carCategoryId = carCategoryResult[0].category;

    // שליפת ערכי הקטגוריה
    const [category] = await pool.query('SELECT km_limit_per_unit, price_per_day, saturday_holiday_price, extra_km_price FROM car_categories WHERE category_id = ?', [carCategoryId]);
    if (category.length === 0) {
      throw new Error(`Category with id ${carCategoryId} not found`);
    }
    const kmLimitPerUnit = parseFloat(category[0].km_limit_per_unit) || 0;
    const pricePerDay = parseFloat(category[0].price_per_day) || 0;
    const saturdayHolidayPrice = parseFloat(category[0].saturday_holiday_price) || 0;
    const extraKmPrice = parseFloat(category[0].extra_km_price) || 0;

    console.log(`kmLimitPerUnit: ${kmLimitPerUnit}, pricePerDay: ${pricePerDay}, saturdayHolidayPrice: ${saturdayHolidayPrice}, extraKmPrice: ${extraKmPrice}`);

    // שליפת תעריפים מיוחדים
    const [specialRates] = await pool.query('SELECT rate_name, start_date, end_date, daily_rate FROM special_rates WHERE category_id = ? AND start_date <= ? AND end_date >= ?', [carCategoryId, end, start]);

    specialRates.forEach(rate => {
      console.log(`Special rate: ${rate.rate_name}, startDate: ${rate.start_date}, endDate: ${rate.end_date}, dailyRate: ${rate.daily_rate}`);
    });

    const specialRatesMap = specialRates.reduce((map, rate) => {
      const dailyRate = parseFloat(rate.daily_rate);
      console.log(`Parsed dailyRate for rate ${rate.rate_name}: ${dailyRate}`);
      if (isNaN(dailyRate)) {
        console.error(`Error: rate.dailyRate is NaN for rate: ${rate.rate_name}, dailyRate: ${rate.daily_rate}`);
      } else {
        map[rate.rate_name] = {
          startDate: new Date(rate.start_date),
          endDate: subDays(new Date(rate.end_date), 1), // להחסיר יום אחד מתאריך הסיום של התעריף המיוחד
          dailyRate
        };
      }
      return map;
    }, {});

    // הדפסת תוכן המפה לאחר העיבוד
    console.log(`Special Rates Map: ${JSON.stringify(specialRatesMap)}`);

    // שליפת הגדרות החברה
    const [settings] = await pool.query('SELECT setting_name, setting_value FROM settings WHERE company_id = ? AND (branch_id = ? OR branch_id IS NULL)', [companyId, branchId]);
    const settingsMap = settings.reduce((map, setting) => {
      map[setting.setting_name] = setting.setting_value;
      return map;
    }, {});

    // בדיקת ההגדרה לחישוב ק"מ בשבתות וחגים
    const kmOnSaturdaysAndHolidays = settingsMap['km_on_saturdays_and_holidays'] === 'yes';
    const paymentForSaturdaysAndHolidays = settingsMap['payment_for_saturdays_and_holidays'] === 'yes';
    const trafficFee = parseFloat(settingsMap['traffic_fee']) || 0;
    const tollFee = parseFloat(settingsMap['toll_fee']) || 0;

    let totalKmLimit;
    let kmCalculationDays;
    if (kmOnSaturdaysAndHolidays) {
      totalKmLimit = kmLimitPerUnit * days.length;
      kmCalculationDays = days.length;
    } else {
      totalKmLimit = kmLimitPerUnit * weekdays;
      kmCalculationDays = weekdays;
    }

    console.log(`Total Km Limit: ${totalKmLimit}, Km Calculation Days: ${kmCalculationDays}`);

    let totalPrice = 0;
    let specialRateDays = new Set();
    const rateBreakdown = [];

    // חישוב מחיר התעריפים המיוחדים
    if (specialRates.length > 0) {
      specialRates.forEach(rate => {
        const rateData = specialRatesMap[rate.rate_name];
        console.log(`Calculating rate days for ${rate.rate_name} with startDate: ${rateData.startDate} and endDate: ${rateData.endDate}`);
        const rateDays = days.filter(day => day >= rateData.startDate && day <= rateData.endDate);
        console.log(`Rate Days for ${rate.rate_name}: ${rateDays}`);
        rateDays.forEach(day => specialRateDays.add(day.toISOString()));

        const dailyRate = rateData.dailyRate;
        if (!isNaN(dailyRate)) {
          console.log(`Adding special rate: ${dailyRate} * ${rateDays.length} days`);
          totalPrice += dailyRate * rateDays.length;
          rateBreakdown.push({ rateName: rate.rate_name, rateType: 'מיוחד', dailyRate, quantity: rateDays.length });
        }
      });
    }

    console.log(`Special Rate Days: ${Array.from(specialRateDays)}`);

    // Days not covered by special rates
    const regularDays = days.filter(day => !specialRateDays.has(day.toISOString()));
    const regularWeekdays = regularDays.filter(day => !isSaturday(day) && !holidayDates.some(holiday => format(holiday, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))).length;
    const regularSaturdaysAndHolidays = regularDays.length - regularWeekdays;

    console.log(`Regular Weekdays: ${regularWeekdays}, Regular Saturdays and Holidays: ${regularSaturdaysAndHolidays}`);

    if (paymentForSaturdaysAndHolidays) {
      totalPrice += pricePerDay * regularDays.length;
      rateBreakdown.push({ rateName: 'תעריף בסיס', rateType: 'רגיל', dailyRate: pricePerDay, quantity: regularDays.length });
      console.log(`Adding regular days: ${pricePerDay} * ${regularDays.length} days`);
    } else {
      totalPrice += (pricePerDay * regularWeekdays) + (saturdayHolidayPrice * regularSaturdaysAndHolidays);
      rateBreakdown.push({ rateName: 'תעריף בסיס', rateType: 'רגיל', dailyRate: pricePerDay, quantity: regularWeekdays });
      rateBreakdown.push({ rateName: 'תעריף שבת / חג', rateType: 'שבת/חג', dailyRate: saturdayHolidayPrice, quantity: regularSaturdaysAndHolidays });
      console.log(`Adding regular weekdays: ${pricePerDay} * ${regularWeekdays} days`);
      console.log(`Adding Saturdays and Holidays: ${saturdayHolidayPrice} * ${regularSaturdaysAndHolidays} days`);
    }

    // בדיקה לוודא שאין NaN בערכים המחושבים
    if (isNaN(totalPrice)) {
      console.error('Error: Total price is NaN');
      console.log(`specialRateDays: ${Array.from(specialRateDays)}, regularDays: ${regularDays}, regularWeekdays: ${regularWeekdays}, regularSaturdaysAndHolidays: ${regularSaturdaysAndHolidays}`);
    }

    console.log(`Total days: ${days.length}, Saturdays and Holidays: ${saturdaysAndHolidays}, Weekdays: ${weekdays}, Total Km Limit: ${totalKmLimit}, Km Calculation Days: ${kmCalculationDays}, Extra Km Price: ${extraKmPrice}, Total Price: ${totalPrice}`);

    return {
      totalDays: days.length,
      saturdaysAndHolidays,
      weekdays,
      kmLimitPerUnit,
      kmCalculationDays,
      totalKmLimit,
      extraKmPrice,
      totalPrice: isNaN(totalPrice) ? 0 : totalPrice,
      trafficFee,
      tollFee,
      specialRates: specialRatesMap,
      rateBreakdown
    };
  } catch (error) {
    console.error('Error calculating rental details:', error);
    throw error;
  }
}

module.exports = calculateRentalDetails;
