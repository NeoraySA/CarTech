const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const pool = require('./database'); // הנחה שיש לך קובץ זה עם הגדרות החיבור למסד הנתונים

app.use(cors());
app.use(express.json());
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'your_very_secret_key_here';

// Middleware לאימות JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401); // אם אין טוקן, החזר Unauthorized
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // אם הטוקן לא תקף, החזר Forbidden
    }
    req.user = user;
    next(); // המשך לנקודת הקצה המבוקשת
  });
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE user_name = ? AND is_active = 1';
  pool.query(query, [username], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'שגיאה בשרת' });
    }
    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (match) {
        const token = jwt.sign({ userId: user.id, username: user.user_name }, SECRET_KEY, { expiresIn: '1m' }); 
        return res.status(200).json({ message: 'התחברות מוצלחת', token });
      } else {
        return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
      }
    } else {
      return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
    }
  });
});

app.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.get('/api/users', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM users';
  pool.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'שגיאה בשרת' });
      return;
    }
    console.log(results); // לוג התוצאות
    res.json(results);
  });
});



// נקודת קצה לקבלת כל הצבעים
app.get('/api/colors', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM colors', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// נקודת קצה להוספת צבע חדש
app.post('/api/colors', authenticateToken, (req, res) => {
  const { colorName, hexCode } = req.body;
  const query = `INSERT INTO colors (color_name, hex_code) VALUES (?, ?)`;

  pool.query(query, [colorName, hexCode], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add the color to the database' });
      return;
    }
    res.status(201).json({ message: 'Color added successfully', colorId: results.insertId });
  });
});

// נקודת קצה לעדכון צבע קיים
app.put('/api/colors/:id', authenticateToken, (req, res) => {
  const { id } = req.params; // הזהות של הצבע מה-URL
  const { hex_code } = req.body; // הקוד ההקסדצימלי החדש מהבקשה

  if (!hex_code) {
    return res.status(400).json({ error: 'Hex code is required' });
  }

  const query = 'UPDATE colors SET hex_code = ? WHERE color_id = ?';

  pool.query(query, [hex_code, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update the color in the database' });
      return;
    }
    if (results.affectedRows === 0) {
      // אם לא נעשה שינוי, ייתכן שה-ID לא קיים
      return res.status(404).json({ error: 'Color not found' });
    }
    res.json({ message: 'Color updated successfully' });
  });
});


// נקודת קצה לקבלת כל הרכבים
app.get('/api/cars', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM cars', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// נקודת קצה להוספת רכב חדש
app.post('/api/cars', authenticateToken, (req, res) => {
  const { licenseNumber, make, model, year, color, transmissionType, fuelType, passenger, kmToNextService, testDate, category } = req.body;
  const query = `INSERT INTO cars (license_number, make, model, year, color, transmission_type, fuel_type, passenger, km_to_next_service, test_date, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(query, [licenseNumber, make, model, year, color, transmissionType, fuelType, passenger, kmToNextService, testDate, category], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add the car to the database' });
      return;
    }
    res.status(201).json({ message: 'Car added successfully', carId: results.insertId });
  });
});





// נקודת קצה לקבלת כל הלקוחות
app.get('/api/customers', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});



const generateShortUrl = () => {
  // פונקציה פשוטה ליצירת קישור קצר - בפרויקט אמיתי שקול שימוש במנגנון מתקדם יותר
  return Math.random().toString(36).substring(2, 8);
};

app.post('/api/links', (req, res) => {
const { originalUrl } = req.body;
const shortUrl = generateShortUrl();

pool.query('INSERT INTO links (original_url, short_url) VALUES (?, ?)', [originalUrl, shortUrl], (err, results) => {
  if (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create the link' });
    return;
  }
  res.status(201).json({ originalUrl, shortUrl: `http://localhost:${PORT}/${shortUrl}` });
});
});



app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  pool.query('SELECT id, original_url FROM links WHERE short_url = ?', [shortUrl], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Link not found' });
      return;
    }

    const linkId = results[0].id;
    const originalUrl = results[0].original_url;
    // איסוף נתונים נוספים
    const clickIp = req.ip;
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers['referer'] || req.headers['referrer'];

    pool.query('INSERT INTO clicks (link_id, click_ip, user_agent, click_referrer) VALUES (?, ?, ?, ?)', 
    [linkId, clickIp, userAgent, referrer], (clickErr, clickResults) => {
      if (clickErr) {
        console.error(clickErr);
        // אפשרות להחזיר שגיאה או להמשיך להפניה
      }
      // הפניה ל-URL המקורי
      res.redirect(originalUrl);
    });
  });
});


// הגדרת PORT משתנה
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});