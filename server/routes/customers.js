const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');





// GET request to fetch a single customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  console.log('Attempting to fetch customer with ID:', id);

  try {
    // Fetch customer details
    const customerQuery = 'SELECT * FROM customers WHERE customer_id = ?';
    console.log('Executing query:', customerQuery, 'with ID:', id);
    const [customerResults] = await pool.query(customerQuery, [id]);
    console.log('Customer query results:', customerResults);

    if (customerResults.length === 0) {
      console.log('No customer found with ID:', id);
      return res.status(404).json({ message: 'Customer not found' });
    }

    const customer = customerResults[0];

    // Fetch driver's details for the customer
    const driversQuery = 'SELECT * FROM drivers WHERE customer_id = ?';
    console.log('Executing query:', driversQuery, 'with customer ID:', id);
    const [driversResults] = await pool.query(driversQuery, [id]);
    console.log('Drivers query results:', driversResults);

    // Fetch credit card details for the customer
    const creditCardsQuery = 'SELECT * FROM credit_cards WHERE customer_id = ?';
    console.log('Executing query:', creditCardsQuery, 'with customer ID:', id);
    const [creditCardsResults] = await pool.query(creditCardsQuery, [id]);
    console.log('Credit cards query results:', creditCardsResults);

    // Combine all results
    const response = {
      ...customer,
      drivers: driversResults,
      creditCards: creditCardsResults,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching customer details:', error);
    res.status(500).json({ error: 'Failed to fetch customer details' });
  }
});







// PUT request to update customer details
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { companyId, branchId } = req.user;

  const {
    last_name, first_name, company_name, street, building_number, city, country,
    telephone, cellphone, fax, email, gender, category, is_active,
    vat_exempt, deposit_exempt, added_by, notes, referral, id_number
  } = req.body;

  try {
    const query = `
      UPDATE customers SET
        last_name = ?, first_name = ?, company_name = ?, street = ?, building_number = ?, city = ?, country = ?,
        telephone = ?, cellphone = ?, fax = ?, email = ?, gender = ?, category = ?, is_active = ?, vat_exempt = ?, 
        deposit_exempt = ?, added_by = ?, notes = ?, referral = ?, id_number = ?
      WHERE customer_id = ? AND company_id = ? AND branch_id = ?`;

    const values = [
      last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender, category, is_active ? 1 : 0, // המרת ערך is_active
      vat_exempt ? 1 : 0, deposit_exempt ? 1 : 0, added_by, notes, referral, id_number, id, companyId, branchId
    ];

    const [results] = await pool.query(query, values);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found or no changes made' });
    }

    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});



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
  const { companyId, branchId, userId } = req.user; // Use the correct company, branch, and user IDs from user data
  console.log('companyId:', companyId, 'branchId:', branchId, 'userId:', userId); // Print company, branch, and user ID for verification

  try {
    // Destructuring all fields from the form data
    const {
      last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender_id, category, vat_exempt,
      notes, referral, id_number
    } = req.body;

    const query = `
      INSERT INTO customers 
      (last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender_id, category, vat_exempt,
      notes, company_id, branch_id, referral, id_number, added_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Using an array to pass values ensures they match the placeholders in the query
    const values = [
      last_name, first_name, company_name, street, building_number, city, country,
      telephone, cellphone, fax, email, gender_id, category, vat_exempt,
      notes, companyId, branchId, referral, id_number, userId
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



// POST request to add a new driver for a customer
router.post('/:id/drivers', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, license_number, license_expiry, phone } = req.body;

  try {
    const query = `
      INSERT INTO drivers 
      (customer_id, first_name, last_name, license_number, license_expiry, phone) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [id, first_name, last_name, license_number, license_expiry, phone];

    const [results] = await pool.query(query, values);
    res.status(201).json({ message: 'Driver added successfully', driverId: results.insertId });
  } catch (error) {
    console.error('Failed to add the driver to the database:', error);
    res.status(500).json({ error: 'Failed to add the driver to the database' });
  }
});




module.exports = router;
