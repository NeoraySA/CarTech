const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// Get settings for a company/branch
router.get('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // שימוש במידע מתוך הטוקן
  try {
    const query = branchId 
      ? 'SELECT * FROM settings WHERE company_id = ? AND (branch_id = ? OR branch_id IS NULL)' 
      : 'SELECT * FROM settings WHERE company_id = ? AND branch_id IS NULL';
    const params = branchId ? [companyId, branchId] : [companyId];
    const [results] = await pool.query(query, params);
    if (results.length > 0) {
      res.json(results[0]); // Assuming the first row is what we need
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error fetching settings' });
  }
});

// Update settings for a company/branch
router.put('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // שימוש במידע מתוך הטוקן
  const { settings } = req.body;

  if (!settings || typeof settings !== 'object') {
    return res.status(400).json({ error: 'Invalid settings format' });
  }

  try {
    const query = `
      INSERT INTO settings (company_id, branch_id, toll_fee, traffic_fee, return_same_time_as_pickup, default_return_time, vat_percentage)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        toll_fee = VALUES(toll_fee),
        traffic_fee = VALUES(traffic_fee),
        return_same_time_as_pickup = VALUES(return_same_time_as_pickup),
        default_return_time = VALUES(default_return_time),
        vat_percentage = VALUES(vat_percentage)`;

    await pool.query(query, [
      companyId, 
      branchId || null, 
      settings.toll_fee, 
      settings.traffic_fee, 
      settings.return_same_time_as_pickup, 
      settings.default_return_time, 
      settings.vat_percentage
    ]);

    res.status(200).json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Server error updating settings' });
  }
});

module.exports = router;
