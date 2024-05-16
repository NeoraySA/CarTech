const express = require('express');
const router = express.Router();
const axios = require('axios');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/vehicle/:licenseNumber', authenticateToken, async (req, res) => {
  const { licenseNumber } = req.params;
  const initialApiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${licenseNumber}`;

  try {
    const initialResponse = await axios.get(initialApiUrl);
    if (initialResponse.data && initialResponse.data.result && initialResponse.data.result.records.length > 0) {
      const vehicleData = initialResponse.data.result.records[0];
      const { tozeret_cd, degem_cd, shnat_yitzur } = vehicleData;
      const additionalApiUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=142afde2-6228-49f9-8a29-9b6c3a0cbe40&q=${tozeret_cd},${degem_cd},${shnat_yitzur}`;
      const vehicleDetailsUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=56063a99-8a3e-4ff4-912e-5966c0279bad&q=${licenseNumber}`;
      const ownershipDetailsUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=bb2355dc-9ec7-4f06-9c3f-3344672171da&q=${licenseNumber}`;
      const disabilityTagUrl = `https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=${licenseNumber}`;

      const [additionalResponse, vehicleDetailsResponse, ownershipDetailsResponse, disabilityTagResponse] = await Promise.all([
        axios.get(additionalApiUrl),
        axios.get(vehicleDetailsUrl),
        axios.get(ownershipDetailsUrl),
        axios.get(disabilityTagUrl)
      ]);

      const additionalData = additionalResponse.data?.result?.records[0] ?? {};
      const vehicleDetailsData = vehicleDetailsResponse.data?.result?.records[0] ?? {};
      let ownershipDetailsData = ownershipDetailsResponse.data?.result?.records ?? [];
      const hasDisabilityTag = disabilityTagResponse.data?.result?.records.length > 0;  // נתונים על תו נכה

      ownershipDetailsData = ownershipDetailsData.map(record => ({
        ...record,
        baalut_dt: record.baalut_dt ? `${record.baalut_dt.toString().substring(4, 6)}/${record.baalut_dt.toString().substring(0, 4)}` : 'Unknown date'
      }));

      const fullVehicleData = { 
        ...vehicleData, 
        ...additionalData, 
        vehicleDetails: vehicleDetailsData, 
        ownershipHistory: ownershipDetailsData,
        hasDisabilityTag: hasDisabilityTag  // הוספת נתון על תו נכה
      };

      res.json(fullVehicleData);
    } else {
      res.status(404).json({ message: 'Vehicle data not found' });
    }
  } catch (error) {
    console.error('Error retrieving vehicle data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
