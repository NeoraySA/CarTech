const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database'); // וודא שיש לך קובץ database.js שמתקן את החיבור למסד הנתונים

// הפעלת middleware
app.use(cors());
app.use(express.json()); // מחליף את bodyParser.json()

// נקודת קצה לדוגמה
app.get('/', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// נקודת קצה לקבלת כל הרכבים
app.get('/api/cars', (req, res) => {
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
app.post('/api/cars', (req, res) => {
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
app.get('/api/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});



// הגדרת PORT משתנה
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
