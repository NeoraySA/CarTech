const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET request to fetch all car categories
router.get('/car-categories', async (req, res) => {
  try {
    const query = 'SELECT * FROM car_categories';
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching car categories:', error);
    res.status(500).json({ error: 'Failed to fetch car categories' });
  }
});

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = router;
