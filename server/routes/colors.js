const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, (req, res) => {
  pool.query('SELECT * FROM colors', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

router.post('/', authenticateToken, (req, res) => {
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

router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { hex_code } = req.body;

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
      return res.status(404).json({ error: 'Color not found' });
    }
    res.json({ message: 'Color updated successfully' });
  });
});

module.exports = router;
