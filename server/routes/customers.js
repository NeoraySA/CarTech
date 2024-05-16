const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// GET request to fetch all customers
router.get('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // שימוש בשמות הנכונים
  console.log('companyId:', companyId, 'branchId:', branchId); // הדפס נתוני חברה וסניף לבדיקה

  try {
    const [results] = await pool.query('SELECT * FROM customers WHERE company_id = ? AND branch_id = ?', [companyId, branchId]);
    res.json(results);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request to add a new customer
router.post('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // שימוש בשמות הנכונים
  console.log('companyId:', companyId, 'branchId:', branchId); // הדפס נתוני חברה וסניף לבדיקה

  try {
    // Destructuring all fields from the form data
    const {
      last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender, category, is_active,
      vat_exempt, deposit_exempt, added_by, notes, referral, id_number
    } = req.body;

    const query = `
      INSERT INTO customers 
      (last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender, category, is_active,
      vat_exempt, deposit_exempt, added_by, notes, company_id, branch_id,
      referral, id_number) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Using array to pass values ensures they match the placeholders in the query
    const values = [
      last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender, category, is_active,
      vat_exempt, deposit_exempt, added_by, notes, companyId, branchId,
      referral, id_number
    ];

    const [results] = await pool.query(query, values);
    res.status(201).json({ message: 'Customer added successfully', customerId: results.insertId });
  } catch (error) {
    console.error('Failed to add the customer to the database:', error);
    res.status(500).json({ error: 'Failed to add the customer to the database' });
  }
});

module.exports = router;
