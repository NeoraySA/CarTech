const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// שליפת קטגוריות רכב לפי company_id מהטוקן
router.get('/', authenticateToken, async (req, res) => {
  const { companyId } = req.user; // Getting companyId from the authenticated user
  console.log('Fetching car categories for companyId:', companyId);

  try {
    const query = 'SELECT category_id as id, category_name, description, km_limit_per_unit, price_per_day, saturday_holiday_price, extra_km_price FROM car_categories WHERE company_id = ?';
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

// הוספת קטגוריה חדשה
router.post('/', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  const {
    category_name,
    description,
    km_limit_per_unit,
    price_per_day,
    saturday_holiday_price,
    extra_km_price,
    new_driver_price_increase,
    young_driver_price_increase,
    include_new_young_driver_on_saturday_holiday
  } = req.body;

  const query = `
    INSERT INTO car_categories (
      category_name, description, km_limit_per_unit, price_per_day, saturday_holiday_price, extra_km_price, 
      new_driver_price_increase, young_driver_price_increase, include_new_young_driver_on_saturday_holiday, company_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    category_name,
    description,
    km_limit_per_unit,
    price_per_day,
    saturday_holiday_price,
    extra_km_price,
    new_driver_price_increase,
    young_driver_price_increase,
    include_new_young_driver_on_saturday_holiday ? 1 : 0, // נוודא שהערך יהיה 0 או 1
    companyId
  ];

  try {
    const [results] = await pool.query(query, params);
    res.status(201).json({ message: 'Category added successfully', categoryId: results.insertId });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ error: 'Server error adding category', details: err.message });
  }
});


// מחיקת קטגוריה לפי ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log('Deleting category with ID:', id);

  try {
    const query = 'DELETE FROM car_categories WHERE category_id = ?';
    const [results] = await pool.query(query, [id]);

    if (results.affectedRows === 0) {
      console.log('Category not found for ID:', id);
      return res.status(404).json({ error: 'Category not found' });
    }

    console.log('Category deleted successfully for ID:', id);
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ error: 'Server error deleting category', details: err.message });
  }
});

// עדכון פרטי קטגוריה לפי ID
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const {
    category_name,
    km_limit_per_unit,
    price_per_day,
    saturday_holiday_price,
    extra_km_price,
    description,
    new_driver_price_increase,
    young_driver_price_increase,
    include_new_young_driver_on_saturday_holiday
  } = req.body;

  console.log('Updating category details for ID:', id, 'with data:', req.body);

  try {
    const query = `UPDATE car_categories SET
      category_name = ?,
      km_limit_per_unit = ?,
      price_per_day = ?,
      saturday_holiday_price = ?,
      extra_km_price = ?,
      description = ?, 
      new_driver_price_increase = ?,
      young_driver_price_increase = ?,
      include_new_young_driver_on_saturday_holiday = ?
      WHERE category_id = ?`;

    const params = [
      category_name,
      km_limit_per_unit,
      price_per_day,
      saturday_holiday_price,
      extra_km_price,
      description,
      new_driver_price_increase,
      young_driver_price_increase,
      include_new_young_driver_on_saturday_holiday,
      id
    ];

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
  let { rate_name, start_date, end_date, daily_rate, include_saturday_holiday } = req.body;
  console.log('Adding special rate for category ID:', categoryId, 'with data:', req.body);

  try {
    // המרת התאריכים לפורמט YYYY-MM-DD
    start_date = new Date(start_date).toISOString().split('T')[0];
    end_date = new Date(end_date).toISOString().split('T')[0];

    const query = 'INSERT INTO special_rates (category_id, rate_name, start_date, end_date, daily_rate, include_saturday_holiday) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [categoryId, rate_name, start_date, end_date, daily_rate, include_saturday_holiday];
    const [results] = await pool.query(query, params);

    console.log('Special rate added successfully for category ID:', categoryId);
    res.status(201).json({ message: 'Special rate added successfully', rateId: results.insertId });
  } catch (err) {
    console.error("Error adding special rate:", err);
    res.status(500).json({ error: 'Server error adding special rate', details: err.message });
  }
});

// עדכון תעריף מיוחד
router.put('/car-special-rates/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  let { rate_name, start_date, end_date, daily_rate, include_saturday_holiday } = req.body;
  console.log('Updating special rate for ID:', id, 'with data:', req.body);

  try {
    // המרת התאריכים לפורמט YYYY-MM-DD
    start_date = new Date(start_date).toISOString().split('T')[0];
    end_date = new Date(end_date).toISOString().split('T')[0];

    const query = `UPDATE special_rates SET rate_name = ?, start_date = ?, end_date = ?, daily_rate = ?, include_saturday_holiday = ? WHERE id = ?`;
    const params = [rate_name, start_date, end_date, daily_rate, include_saturday_holiday, id];
    const [results] = await pool.query(query, params);

    if (results.affectedRows === 0) {
      console.log('Special rate not found for ID:', id);
      return res.status(404).json({ error: 'Special rate not found' });
    }

    console.log('Special rate updated successfully for ID:', id);
    res.json({ message: 'Special rate updated successfully' });
  } catch (err) {
    console.error("Error updating special rate:", err);
    res.status(500).json({ error: 'Server error updating special rate', details: err.message });
  }
});

// מחיקת תעריף מיוחד לפי ID
router.delete('/car-special-rates/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log('Deleting special rate with ID:', id);

  try {
    const query = 'DELETE FROM special_rates WHERE id = ?';
    const [results] = await pool.query(query, [id]);

    if (results.affectedRows === 0) {
      console.log('Special rate not found for ID:', id);
      return res.status(404).json({ error: 'Special rate not found' });
    }

    console.log('Special rate deleted successfully for ID:', id);
    res.json({ message: 'Special rate deleted successfully' });
  } catch (err) {
    console.error("Error deleting special rate:", err);
    res.status(500).json({ error: 'Server error deleting special rate', details: err.message });
  }
});

module.exports = router;
