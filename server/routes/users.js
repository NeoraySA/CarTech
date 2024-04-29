const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database'); // הנחה שיש לך קובץ שמטפל בחיבור למסד הנתונים בנתיב הזה
const router = express.Router();

// פונקציה לטיפול בבקשות התחברות ממשתמשים
router.post('/login', async (req, res) => {
  // הוצאת שם המשתמש והסיסמה מגוף הבקשה
  const { username, password } = req.body;

  // ביצוע שאילתה למסד הנתונים לאיתור המשתמש לפי שם המשתמש
  const query = 'SELECT * FROM users WHERE user_name = ? AND is_active = 1';
  pool.query(query, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'שגיאה בחיבור למסד הנתונים' });
    }

    // אם נמצא משתמש עם השם המשתמש שהוזן
    if (results.length > 0) {
      const user = results[0];
      // בדיקה אם הסיסמה שהוזנה תואמת לסיסמה המוצפנת שנשמרה במסד הנתונים
      const match = await bcrypt.compare(password, user.password_hash);

      if (match) {
        // יצירת טוקן עם מזהה המשתמש ושם המשתמש, תוקף לשעה אחת
        const token = jwt.sign({ userId: user.id, username: user.user_name }, process.env.SECRET_KEY, { expiresIn: '1h' });
        // שליחת הטוקן חזרה ללקוח
        res.json({ message: 'ההתחברות הצליחה', token });
      } else {
        // אם הסיסמה לא תואמת
        res.status(401).json({ error: 'שם המשתמש או הסיסמה שגויים' });
      }
    } else {
      // אם לא נמצא משתמש עם שם המשתמש שהוזן
      res.status(401).json({ error: 'שם המשתמש לא קיים או לא פעיל' });
    }
  });
});

// כאן ניתן להוסיף נקודות קצה נוספות לטיפול בפעולות הקשורות למשתמשים

module.exports = router; // ייצוא ה-router כדי שנוכל להשתמש בו בקובץ הראשי של השרת
