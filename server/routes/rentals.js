const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// Get all rentals
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM rentals');
    res.json(results);
  } catch (err) {
    console.error("Error retrieving rentals:", err);
    res.status(500).json({ error: 'Server error retrieving rentals' });
  }
});

// Get rental by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM rentals WHERE rental_id = ?', [id]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json(results[0]);
  } catch (err) {
    console.error("Error retrieving rental:", err);
    res.status(500).json({ error: 'Server error retrieving rental' });
  }
});

// Create new rental
router.post('/', authenticateToken, async (req, res) => {
  const rentalData = req.body;
  console.log("Received rental data:", rentalData); // הדפסת הנתונים המתקבלים
  try {
    const [result] = await pool.query('INSERT INTO rentals SET ?', [rentalData]);
    console.log("Insert result:", result); // הדפסת תוצאות ההכנסה
    res.status(201).json({ rental_id: result.insertId, ...rentalData });
  } catch (err) {
    console.error("Error creating rental:", err);
    res.status(500).json({ error: 'Server error creating rental' });
  }
});

// Update rental
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const rentalData = req.body;
  try {
    const [result] = await pool.query('UPDATE rentals SET ? WHERE rental_id = ?', [rentalData, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json({ message: 'Rental updated successfully', ...rentalData });
  } catch (err) {
    console.error("Error updating rental:", err);
    res.status(500).json({ error: 'Server error updating rental' });
  }
});

// Delete rental
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM rentals WHERE rental_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json({ message: 'Rental deleted successfully' });
  } catch (err) {
    console.error("Error deleting rental:", err);
    res.status(500).json({ error: 'Server error deleting rental' });
  }
});

module.exports = router;
