const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// שליפת רכבים מהמסד נתונים
router.get('/', authenticateToken, async (req, res) => {
  console.log('User details:', req.user);
  const { companyId, branchId } = req.user;
  const { is_available, status_id } = req.query; 

  console.log('companyId:', companyId, 'branchId:', branchId);
  console.log('is_available:', is_available, 'status_id:', status_id);

  let query = 'SELECT * FROM cars WHERE company_id = ? AND branch_id = ?';
  const params = [companyId, branchId];

  if (is_available) {
    query += ' AND is_available = ?';
    params.push(is_available);
  }
  if (status_id) {
    query += ' AND status_id = ?';
    params.push(status_id);
  }

  try {
    const [results] = await pool.query(query, params);
    res.json(results);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// שליפת רכב לפי ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await pool.query('SELECT * FROM cars WHERE id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// הוספת רכב חדש
router.post('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user;
  const {
    license_number, model, make, year, fuel_type, passenger, km_to_next_service,
    test_date, category, status_id, is_available, current_km, current_fuel_level, color, transmission_type
  } = req.body;

  const query = 'INSERT INTO cars (license_number, model, make, year, fuel_type, passenger, km_to_next_service, test_date, category, status_id, company_id, branch_id, is_available, current_km, current_fuel_level, color, transmission_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [
    license_number, model, make, year, fuel_type, passenger, km_to_next_service, test_date, category, status_id, companyId, branchId, is_available, current_km, current_fuel_level, color, transmission_type
  ];

  try {
    const [results] = await pool.query(query, params);
    console.log('New car added:', results);
    res.status(201).json({ message: 'New car added successfully', carId: results.insertId });
  } catch (err) {
    console.error("Failed to add new car:", err);
    res.status(500).json({ error: 'Failed to add new car', details: err.message });
  }
});

module.exports = router;

