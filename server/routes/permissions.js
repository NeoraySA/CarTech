const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// Get all roles
router.get('/roles', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM roles');
    res.json(results);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Server error fetching roles' });
  }
});

// Get all permissions
router.get('/permissions', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM permissions');
    res.json(results);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    res.status(500).json({ error: 'Server error fetching permissions' });
  }
});

// Get permissions for a specific role
router.get('/role-permissions/:roleId', authenticateToken, async (req, res) => {
  const { roleId } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM role_permissions WHERE role_id = ?', [roleId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching role permissions:', error);
    res.status(500).json({ error: 'Server error fetching role permissions' });
  }
});

// Add a permission to a role
router.post('/role-permissions', authenticateToken, async (req, res) => {
  const { role_id, permission_id } = req.body;
  try {
    await pool.query('INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)', [role_id, permission_id]);
    res.status(200).json({ message: 'Permission added to role successfully' });
  } catch (error) {
    console.error('Error adding permission to role:', error);
    res.status(500).json({ error: 'Server error adding permission to role' });
  }
});

// Remove a permission from a role
router.delete('/role-permissions/:role_id/:permission_id', authenticateToken, async (req, res) => {
    const { role_id, permission_id } = req.params;
    try {
      await pool.query('DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?', [role_id, permission_id]);
      res.status(200).json({ message: 'Permission removed from role successfully' });
    } catch (error) {
      console.error('Error removing permission from role:', error);
      res.status(500).json({ error: 'Server error removing permission from role' });
    }
  });
  

module.exports = router;
