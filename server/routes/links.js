const express = require('express');
const pool = require('../database'); // נניח שהגדרת החיבור למסד הנתונים מצוייה כאן
const router = express.Router();

// Middleware לאימות JWT - אפשר לייבא אותו אם הוא מוגדר בקובץ חיצוני
const authenticateToken = require('../middleware/authenticate');

// פונקציה ליצירת קישור קצר
const generateShortUrl = () => {
  return Math.random().toString(36).substring(2, 8);
};

// נקודת קצה להוספת קישור חדש
router.post('/', authenticateToken, (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = generateShortUrl();

  pool.query('INSERT INTO links (original_url, short_url) VALUES (?, ?)', [originalUrl, shortUrl], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'לא ניתן ליצור את הקישור הקצר' });
    } else {
      res.status(201).json({ originalUrl, shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}` });
    }
  });
});

// נקודת קצה להפניה מקישור קצר לקישור המקורי
router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  pool.query('SELECT original_url FROM links WHERE short_url = ?', [shortUrl], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'שגיאה בחיפוש הקישור המקורי' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'הקישור הקצר לא נמצא' });
    } else {
      const originalUrl = results[0].original_url;
      res.redirect(originalUrl);
    }
  });
});

// כאן ניתן להוסיף נקודות קצה נוספות לטיפול בקישורים

module.exports = router; // ייצוא ה-router לשימוש בקובץ הראשי של האפליקציה
