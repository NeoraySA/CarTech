const express = require('express');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');
const calculateRentalDetails = require('../utils/calculateRentalDetails');
const calculateRentalAvailability = require('../utils/calculateRentalAvailability');
const { format } = require('date-fns');

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
    const [rates] = await pool.query('SELECT * FROM rental_rates WHERE rental_id = ?', [id]);

    res.json({
      rental,
      drivers,
      charges,
      insurances,
      securities,
      trafficReports,
      tollTravels,
      vehicleDamages,
      payments,
      rates // Adding the rates to the response object
    });
  } catch (err) {
    console.error("Error retrieving rental:", err);
    res.status(500).json({ error: 'Server error retrieving rental' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const rentalData = req.body;
  const { companyId, branchId } = req.user;

  // מאפיינים בטבלת השכרות
  const {
    customer_id,
    start_date,
    end_date,
    car_id,
    km_pickup,
    fuel_pickup,
    price_per_km,
    km_limit_per_unit,
    km_units
  } = rentalData;

  // בדיקת תאריכים תקינים
  if (isNaN(new Date(start_date)) || isNaN(new Date(end_date))) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  // המרת התאריכים לפורמט MySQL DATETIME
  const startDate = format(new Date(start_date), 'yyyy-MM-dd HH:mm:ss');
  const estimatedReturn = format(new Date(end_date), 'yyyy-MM-dd HH:mm:ss'); // שימוש ב-end_date כ-estimated_return

  // בניית האובייקט לכניסה לטבלה
  const newRentalData = {
    customer_id,
    start_date: startDate,
    estimated_return: estimatedReturn, // שימוש בשדה estimated_return
    car_id,
    fuel_pickup,
    km_pickup,
    price_per_km,
    km_limit_per_unit,
    km_units,
    company_id: companyId,
    branch_id: branchId,
    pickup_branch: branchId
  };

  try {
    const [rentalResult] = await pool.query('INSERT INTO rentals SET ?', [newRentalData]);
    
    res.status(201).json({ rental_id: rentalResult.insertId, ...newRentalData });
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

// Calculate rental availability
router.post('/availability', authenticateToken, async (req, res) => {
  const { startDate, endDate, isNewDriver, isYoungDriver } = req.body;
  const { companyId, branchId } = req.user;

  console.log(`Calculating rental availability for startDate: ${startDate}, endDate: ${endDate}, companyId: ${companyId}, branchId: ${branchId}, isNewDriver: ${isNewDriver}, isYoungDriver: ${isYoungDriver}`);
  try {
    const availability = await calculateRentalAvailability(startDate, endDate, companyId, branchId, isNewDriver, isYoungDriver);
    res.status(200).json(availability);
  } catch (error) {
    console.error("Error calculating rental availability:", error);
    res.status(500).json({ message: 'Error calculating rental availability', error });
  }
});

module.exports = router;
