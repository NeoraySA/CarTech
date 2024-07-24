// routes/colors.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// קבלת צבעי החברה
router.get('/companyColors', authenticateToken, async (req, res) => {
  const { companyId } = req.user;

  console.log(`Received request for company colors with companyId: ${companyId}`);

  try {
    const query = 'SELECT * FROM company_colors WHERE company_id = ?';
    const [results] = await pool.query(query, [companyId]);
    
    if (results.length > 0) {
      const colors = {
        'color_1': results[0].color_1,
        'color_2': results[0].color_2,
        'color_3': results[0].color_3,
        'color_4': results[0].color_4,
        'color_5': results[0].color_5,
        'black_color': results[0].black_color,
        'white_color': results[0].white_color,
      };
      console.log(`Found colors for companyId ${companyId}:`, colors);
      res.json(colors);
    } else {
      console.log(`No colors found for companyId ${companyId}`);
      res.status(404).json({ message: 'Company colors not found' });
    }
  } catch (err) {
    console.error('Error retrieving company colors:', err);
    res.status(500).json({ error: 'Server error retrieving company colors' });
  }
});

// עדכון צבעי החברה
router.put('/companyColors', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  const colors = req.body;

  console.log(`Updating company colors for companyId ${companyId} with colors:`, colors);

  try {
    const query = 'UPDATE company_colors SET ? WHERE company_id = ?';
    const [results] = await pool.query(query, [colors, companyId]);

    if (results.affectedRows > 0) {
      console.log(`Updated colors for companyId ${companyId}`);
      res.json({ message: 'Colors updated successfully' });
    } else {
      console.log(`No colors updated for companyId ${companyId}`);
      res.status(404).json({ message: 'Company colors not found' });
    }
  } catch (err) {
    console.error('Error updating company colors:', err);
    res.status(500).json({ error: 'Server error updating company colors' });
  }
});

module.exports = router;
