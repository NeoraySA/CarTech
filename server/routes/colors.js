const express = require('express');
const pool = require('../database'); // נניח שהגדרת החיבור למסד הנתונים מצוייה כאן
const router = express.Router();

// Middleware לאימות JWT - אפשר לייבא אותו אם הוא מוגדר בקובץ חיצוני
const authenticateToken = require('../middleware/authenticate');

// נקודת קצה לקבלת כל הצבעים
router.get('/', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM colors', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'שגיאה בחיבור למסד הנתונים' });
    } else {
      res.json(results);
    }
  });
});

// נקודת קצה להוספת צבע חדש
router.post('/', authenticateToken, (req, res) => {
  const { name, hexValue } = req.body;
  pool.query('INSERT INTO colors (name, hexValue) VALUES (?, ?)', [name, hexValue], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'לא ניתן להוסיף את הצבע למסד הנתונים' });
    } else {
      res.status(201).json({ message: 'הצבע נוסף בהצלחה', colorId: results.insertId });
    }
  });
});

// נקודת קצה לעדכון צבע קיים
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { hexValue } = req.body;
  pool.query('UPDATE colors SET hexValue = ? WHERE id = ?', [hexValue, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'שגיאה בעדכון הצבע' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'הצבע לא נמצא' });
    } else {
      res.json({ message: 'הצבע עודכן בהצלחה' });
    }
  });
});

// כאן ניתן להוסיף נקודות קצה נוספות לטיפול בצבעים

module.exports = router; // ייצוא ה-router לשימוש בקובץ הראשי של האפליקציה
