const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, async (req, res) => {
  console.log('User details:', req.user);
  const { companyId, branchId } = req.user;
  const { is_available, status_id } = req.query; // קבלת פרמטרים מה-query

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
    console.log('Query results:', results);
    res.json(results);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
