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
    res.json(results);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Server error fetching settings' });
  }
});

// Update settings for a company/branch
router.put('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // שימוש במידע מתוך הטוקן
  const { settings } = req.body;
  try {
    for (const setting of settings) {
      const query = 'INSERT INTO settings (company_id, branch_id, setting_name, setting_value) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)';
      await pool.query(query, [companyId, branchId || null, setting.setting_name, setting.setting_value]);
    }
    res.status(200).json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Server error updating settings' });
  }
});

module.exports = router;
