const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

// GET request to fetch all customers
router.get('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // Use the correct company and branch IDs from user data
  const { is_active } = req.query; // Retrieve the is_active parameter from the query string, if provided

  console.log('companyId:', companyId, 'branchId:', branchId, 'is_active:', is_active); // Print for verification

  try {
    let query = 'SELECT * FROM customers WHERE company_id = ? AND branch_id = ?';
    let params = [companyId, branchId];

    // Dynamically append 'is_active' condition if provided
    if (is_active !== undefined) {
      query += ' AND is_active = ?';
      params.push(is_active);
    }

    const [results] = await pool.query(query, params);
    res.json(results);
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request to add a new customer
router.post('/', authenticateToken, async (req, res) => {
  const { companyId, branchId } = req.user; // Use the correct company and branch IDs from user data
  console.log('companyId:', companyId, 'branchId:', branchId); // Print company and branch ID for verification

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

    // Using an array to pass values ensures they match the placeholders in the query
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

// GET request to fetch drivers by customer ID
router.get('/drivers', authenticateToken, async (req, res) => {
  const { customerId } = req.query; // Retrieve the customer ID from the query string

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const query = 'SELECT * FROM drivers WHERE customer_id = ?';
    const [results] = await pool.query(query, [customerId]);
    res.json(results);
  } catch (error) {
    console.error('Failed to fetch drivers for customer:', error);
    res.status(500).json({ error: 'Failed to fetch drivers for customer' });
  }
});

module.exports = router;
