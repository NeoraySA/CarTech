const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// שליפת קטגוריות רכב לפי company_id מהטוקן
router.get('/', authenticateToken, async (req, res) => {
  const { companyId } = req.user; // Getting companyId from the authenticated user
  console.log('Fetching car categories for companyId:', companyId);

  try {
    const query = 'SELECT category_id as id, category_name, km_limit_per_unit, price_per_day, saturday_holiday_price, extra_km_price FROM car_categories WHERE company_id = ?';
    const [results] = await pool.query(query, [companyId]);
    console.log('Car categories fetched:', results);
    res.json(results);
  } catch (err) {
    console.error("Error retrieving car categories:", err);
    res.status(500).json({ error: 'Server error retrieving car categories' });
  }
});

// שליפת פרטי קטגוריה לפי ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log('Fetching category details for ID:', id);

  try {
    const [results] = await pool.query('SELECT * FROM car_categories WHERE category_id = ?', [id]);
    if (results.length === 0) {
      console.log('Category not found for ID:', id);
      return res.status(404).json({ error: 'Category not found' });
    }
    console.log('Category details fetched:', results[0]);
    res.json(results[0]);
  } catch (err) {
    console.error("Error retrieving category details:", err);
    res.status(500).json({ error: 'Server error retrieving category details', details: err.message });
  }
});

// עדכון פרטי קטגוריה לפי ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { category_name, km_limit_per_unit, price_per_day, saturday_holiday_price, extra_km_price } = req.body;
  console.log('Updating category details for ID:', id, 'with data:', req.body);

  try {
    const query = 'UPDATE car_categories SET category_name = ?, km_limit_per_unit = ?, price_per_day = ?, saturday_holiday_price = ?, extra_km_price = ? WHERE category_id = ?';
    const params = [category_name, km_limit_per_unit, price_per_day, saturday_holiday_price, extra_km_price, id];
    const [results] = await pool.query(query, params);

    if (results.affectedRows === 0) {
      console.log('Category not found for update, ID:', id);
      return res.status(404).json({ error: 'Category not found' });
    }

    console.log('Category updated successfully for ID:', id);
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error("Error updating category details:", err);
    res.status(500).json({ error: 'Server error updating category details', details: err.message });
  }
});


// שליפת תעריפים מיוחדים לפי קטגוריה ID
router.get('/car-special-rates/:categoryId', authenticateToken, async (req, res) => {
  const { categoryId } = req.params;
  console.log('Fetching special rates for category ID:', categoryId);

  try {
    const query = 'SELECT * FROM special_rates WHERE category_id = ?';
    const [results] = await pool.query(query, [categoryId]);
    console.log('Special rates fetched for category ID:', categoryId, results);
    res.json(results);
  } catch (err) {
    console.error("Error retrieving special rates:", err);
    res.status(500).json({ error: 'Server error retrieving special rates', details: err.message });
  }
});

// הוספת תעריף מיוחד חדש
router.post('/car-special-rates/:categoryId', authenticateToken, async (req, res) => {
  const { categoryId } = req.params;
  const { rate_name, start_date, end_date, daily_rate } = req.body;
  console.log('Adding special rate for category ID:', categoryId, 'with data:', req.body);

  try {
    const query = 'INSERT INTO special_rates (category_id, rate_name, start_date, end_date, daily_rate) VALUES (?, ?, ?, ?, ?)';
    const params = [categoryId, rate_name, start_date, end_date, daily_rate];
    const [results] = await pool.query(query, params);

    console.log('Special rate added successfully for category ID:', categoryId);
    res.status(201).json({ message: 'Special rate added successfully', rateId: results.insertId });
  } catch (err) {
    console.error("Error adding special rate:", err);
    res.status(500).json({ error: 'Server error adding special rate', details: err.message });
  }
});

module.exports = router;
