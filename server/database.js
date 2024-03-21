const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '176.228.13.37', // או כתובת IP של שרת ה-MySQL שלך
  user: 'nehoray', // שם המשתמש למסד הנתונים
  password: 'Neoray3153!', // הסיסמה למסד הנתונים
  database: 'cartech', // שם מסד הנתונים
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
