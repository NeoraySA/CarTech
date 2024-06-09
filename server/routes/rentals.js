const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');
const calculateRentalDetails = require('../utils/calculateRentalDetails');

// Get all rentals
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM rentals');
    res.json(results);
  } catch (err) {
    console.error("Error retrieving rentals:", err);
    res.status(500).json({ error: 'Server error retrieving rentals' });
  }
});

// Get rental by ID with all associated details
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [[rental]] = await pool.query('SELECT * FROM rental_details_view WHERE rental_id = ?', [id]);
    if (!rental) {
      return res.status(404).json({ error: 'Rental not found' });
    }

    // Fetch additional details associated with the rental
    const [drivers] = await pool.query('SELECT * FROM authorized_drivers WHERE rental_id = ?', [id]);
    const [charges] = await pool.query('SELECT * FROM rental_charges WHERE rental_id = ?', [id]);
    const [insurances] = await pool.query('SELECT * FROM insurances WHERE rental_id = ?', [id]);
    const [securities] = await pool.query('SELECT * FROM credit_securities WHERE rental_id = ?', [id]);
    const [trafficReports] = await pool.query('SELECT * FROM traffic_reports WHERE rental_id = ?', [id]);
    const [tollTravels] = await pool.query('SELECT * FROM toll_travels WHERE rental_id = ?', [id]);
    const [vehicleDamages] = await pool.query('SELECT * FROM vehicle_damages WHERE rental_id = ?', [id]);
    const [payments] = await pool.query('SELECT * FROM payment_rental WHERE rental_id = ?', [id]);

    res.json({
      rental,
      drivers,
      charges,
      insurances,
      securities,
      trafficReports,
      tollTravels,
      vehicleDamages,
      payments
    });
  } catch (err) {
    console.error("Error retrieving rental:", err);
    res.status(500).json({ error: 'Server error retrieving rental' });
  }
});


// Create new rental
router.post('/', authenticateToken, async (req, res) => {
  const rentalData = req.body;
  const { companyId, branchId } = req.user; // הוספת מזהה החברה והסניף מהטוקן

  rentalData.company_id = companyId;
  rentalData.branch_id = branchId;
  rentalData.pickup_branch = branchId; // הנחה כי pickup_branch הוא תמיד הסניף הנוכחי

  console.log("Received rental data:", rentalData); // הדפסת הנתונים המתקבלים
  try {
    const [result] = await pool.query('INSERT INTO rentals SET ?', [rentalData]);
    console.log("Insert result:", result); // הדפסת תוצאות ההכנסה
    res.status(201).json({ rental_id: result.insertId, ...rentalData });
  } catch (err) {
    console.error("Error creating rental:", err);
    res.status(500).json({ error: 'Server error creating rental' });
  }
});

// Update rental
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const rentalData = req.body;
  try {
    const [result] = await pool.query('UPDATE rentals SET ? WHERE rental_id = ?', [rentalData, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json({ message: 'Rental updated successfully', ...rentalData });
  } catch (err) {
    console.error("Error updating rental:", err);
    res.status(500).json({ error: 'Server error updating rental' });
  }
});

// Delete rental
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM rentals WHERE rental_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Rental not found' });
    }
    res.json({ message: 'Rental deleted successfully' });
  } catch (err) {
    console.error("Error deleting rental:", err);
    res.status(500).json({ error: 'Server error deleting rental' });
  }
});

// Calculate rental details
router.post('/calculate', authenticateToken, async (req, res) => {
  const { startDate, endDate, carId } = req.body;
  const { companyId, branchId } = req.user; // הוספת companyId ו-branchId מ-authenticateToken

  console.log(`Calculating rental details for startDate: ${startDate}, endDate: ${endDate}, carId: ${carId}, companyId: ${companyId}, branchId: ${branchId}`);
  try {
    const rentalDetails = await calculateRentalDetails(startDate, endDate, carId, companyId, branchId);
    res.json(rentalDetails);
  } catch (err) {
    console.error("Error calculating rental details:", err);
    res.status(500).json({ error: 'Server error calculating rental details' });
  }
});

// Add authorized driver to rental
router.post('/:id/drivers', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { driver_id, start_date, end_date, is_primary_driver, notes } = req.body;
  try {
    const query = `
      INSERT INTO authorized_drivers
      (rental_id, driver_id, start_date, end_date, is_primary_driver, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [id, driver_id, start_date, end_date, is_primary_driver, notes];
    const [result] = await pool.query(query, values);
    res.status(201).json({
      message: 'Driver added successfully',
      auth_driver_id: result.insertId
    });
  } catch (err) {
    console.error("Error adding authorized driver:", err);
    res.status(500).json({ error: 'Server error adding authorized driver' });
  }
});



module.exports = router;
