const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');


router.get('/customersCategories', authenticateToken, async (req, res) => {
  console.log("Fetching customer categories");
  try {
    const [results] = await pool.query('SELECT id, name FROM customers_categories');
    console.log("Categories fetched:", results);
    res.json(results.map(cat => ({ label: cat.name, value: cat.id })));
  } catch (err) {
    console.error("Error retrieving customer categories:", err);
    res.status(500).json({ error: 'Server error retrieving categories' });
  }
});




// Fetch car categories with authentication, filtered by company_id
router.get('/carCategories/:companyId', authenticateToken, async (req, res) => {
  const { companyId } = req.params; // Getting companyId from the route parameter

  try {
    const query = 'SELECT category_id, category_name FROM car_categories WHERE company_id = ?';
    const [results] = await pool.query(query, [companyId]);
    res.json(results.map(cat => ({ label: cat.category_name, value: cat.category_id })));
  } catch (err) {
    console.error("Error retrieving car categories:", err);
    res.status(500).json({ error: 'Server error retrieving car categories' });
  }
});

module.exports = router;
