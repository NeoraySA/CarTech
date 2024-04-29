const express = require('express');
const pool = require('../database'); // נניח שהגדרת החיבור למסד הנתונים מצוייה כאן
const router = express.Router();

// Middleware לאימות JWT - אפשר לייבא אותו אם הוא מוגדר בקובץ חיצוני
const authenticateToken = require('../middleware/authenticate');

// נקודת קצה לקבלת כל הרכבים
router.get('/', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM cars', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'שגיאה בחיבור למסד הנתונים' });
    } else {
      res.json(results);
    }
  });
});

// נקודת קצה להוספת רכב חדש
router.post('/', authenticateToken, (req, res) => {
  const { licenseNumber, make, model, year, color } = req.body; // ניתן להוסיף פרמטרים נוספים כרצונך
  pool.query('INSERT INTO cars (licenseNumber, make, model, year, color) VALUES (?, ?, ?, ?, ?)', [licenseNumber, make, model, year, color], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'לא ניתן להוסיף את הרכב למסד הנתונים' });
    } else {
      res.status(201).json({ message: 'הרכב נוסף בהצלחה', carId: results.insertId });
    }
  });
});

// נקודת קצה לעדכון רכב קיים
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { color } = req.body; // לדוגמה, עדכון צבע הרכב. ניתן להוסיף פרמטרים נוספים לעדכון
  pool.query('UPDATE cars SET color = ? WHERE id = ?', [color, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'שגיאה בעדכון הרכב' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'הרכב לא נמצא' });
    } else {
      res.json({ message: 'הרכב עודכן בהצלחה' });
    }
  });
});

// כאן ניתן להוסיף נקודות קצה נוספות לטיפול ברכבים

module.exports = router; // ייצוא ה-router לשימוש בקובץ הראשי של האפליקציה
