// routes/branches.js
const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// Get all branches for a company
router.get('/', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  try {
    const [results] = await pool.query('SELECT * FROM branches WHERE company_id = ?', [companyId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching branches:', error);
    res.status(500).json({ error: 'Server error fetching branches' });
  }
});

// Get branch by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  const { id } = req.params;
  try {
    const [results] = await pool.query('SELECT * FROM branches WHERE company_id = ? AND id = ?', [companyId, id]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Branch not found' });
    }
  } catch (error) {
    console.error('Error fetching branch:', error);
    res.status(500).json({ error: 'Server error fetching branch' });
  }
});

// Create a new branch
router.post('/', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  const { name, street, city, phone, fax, email, image_url } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO branches (company_id, name, street, city, phone, fax, email, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [companyId, name, street, city, phone, fax, email, image_url]
    );
    res.status(201).json({ id: result.insertId, name, street, city, phone, fax, email, image_url });
  } catch (error) {
    console.error('Error creating branch:', error);
    res.status(500).json({ error: 'Server error creating branch' });
  }
});

// Update a branch
router.put('/:id', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  const { id } = req.params;
  const { name, street, city, phone, fax, email, image_url } = req.body;

  try {
    await pool.query(
      'UPDATE branches SET name = ?, street = ?, city = ?, phone = ?, fax = ?, email = ?, image_url = ? WHERE company_id = ? AND id = ?',
      [name, street, city, phone, fax, email, image_url, companyId, id]
    );
    res.status(200).json({ id, name, street, city, phone, fax, email, image_url });
  } catch (error) {
    console.error('Error updating branch:', error);
    res.status(500).json({ error: 'Server error updating branch' });
  }
});

// Delete a branch
router.delete('/:id', authenticateToken, async (req, res) => {
  const { companyId } = req.user;
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM branches WHERE company_id = ? AND id = ?', [companyId, id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting branch:', error);
    res.status(500).json({ error: 'Server error deleting branch' });
  }
});

module.exports = router;
