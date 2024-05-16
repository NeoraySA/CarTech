const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, async (req, res) => {
  console.log('User details:', req.user); // הדפס פרטי משתמש לבדיקה
  const { companyId, branchId } = req.user; // שימוש בשמות הנכונים
  console.log('companyId:', companyId, 'branchId:', branchId); // הדפס נתוני חברה וסניף

  try {
    const [results] = await pool.query('SELECT * FROM cars WHERE company_id = ? AND branch_id = ?', [companyId, branchId]);
    console.log('Query results:', results); // הדפס תוצאות שאילתה לבדיקה
    res.json(results);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { licenseNumber, make, model, year, color, transmissionType, fuelType, passenger, kmToNextService, testDate, category } = req.body;
  const { companyId, branchId } = req.user; // שימוש בשמות הנכונים

  const query = `INSERT INTO cars (license_number, make, model, year, color, transmission_type, fuel_type, passenger, km_to_next_service, test_date, category, company_id, branch_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [results] = await pool.query(query, [licenseNumber, make, model, year, color, transmissionType, fuelType, passenger, kmToNextService, testDate, category, companyId, branchId]);
    res.status(201).json({ message: 'Car added successfully', carId: results.insertId });
  } catch (err) {
    console.error("Failed to add the car to the database:", err);
    res.status(500).json({ error: 'Failed to add the car to the database' });
  }
});

module.exports = router;
