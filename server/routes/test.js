const express = require('express');
const router = express.Router();
const pool = require('../database');
const { calculateRentalAvailability } = require('../utils/calculateRentalAvailability');

// GET request to fetch all car categories
router.get('/car-categories', async (req, res) => {
  try {
    const query = 'SELECT * FROM car_categories';
    const [results] = await pool.query(query);
    res.json(results);
  } catch (error) {
    console.error('Error fetching car categories:', error);
    res.status(500).json({ error: 'Failed to fetch car categories' });
  }
});

router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Calculate rental availability
router.post('/availability', async (req, res) => {
  const { startDate, endDate, isNewDriver, isYoungDriver, companyId, branchId } = req.body;

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
