const express = require('express');
const axios = require('axios');
const router = express.Router();
const pool = require('../database');
const authenticateToken = require('../middleware/authenticateToken');

async function getPbxCredentials(companyId) {
    try {
        const [rows] = await pool.query("SELECT username, password FROM api_keys WHERE service_name = ? AND company_id = ?", ['pbx', companyId]);
        if (rows.length === 0) {
            throw new Error('Credentials not found for PBX');
        }
        return rows[0];
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to retrieve PBX credentials from database');
    }
}

router.post('/cdrs/list', authenticateToken, async (req, res) => {
    const { companyId } = req.user;
    const { start, end, caller_number } = req.body;

    if (!companyId) {
        return res.status(400).json({ error: 'Missing company ID' });
    }

    console.log(`Received request to /cdrs/list with body:`, req.body);
    console.log(`Retrieving PBX credentials for company ID: ${companyId}`);

    let credentials;
    try {
        credentials = await getPbxCredentials(companyId);
        console.log(`Credentials retrieved:`, credentials);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    const params = {
        auth_username: credentials.username,
        auth_password: credentials.password,
        start: start || 0,
        end: end || Math.floor(Date.now() / 1000),
        caller_number: caller_number || ''
    };

    console.log(`Request params:`, params);

    try {
        const response = await axios.get('https://www.015pbx.net/local/api/json/cdrs/list', { params });

        console.log(`PBX API response:`, response.data);

        if (response.data && response.data.responses && response.data.responses[0] && response.data.responses[0].code === 200) {
            console.log('Sending data to frontend...');
            res.json(response.data.data);
        } else {
            console.error('Unexpected response structure or error code from PBX API:', response.data);
            res.status(500).json({ error: 'Unexpected response structure or error code from PBX API', details: response.data });
        }
    } catch (error) {
        console.error('Error fetching data from PBX API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching data from PBX API', details: error.response ? error.response.data : error.message });
    }
});

router.post('/cdrs/get', authenticateToken, async (req, res) => {
    const { companyId } = req.user;
    const { uniqueid } = req.body;

    if (!companyId) {
        return res.status(400).json({ error: 'Missing company ID' });
    }

    console.log(`Received request to /cdrs/get with body:`, req.body);
    console.log(`Retrieving PBX credentials for company ID: ${companyId}`);

    let credentials;
    try {
        credentials = await getPbxCredentials(companyId);
        console.log(`Credentials retrieved:`, credentials);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    const params = {
        auth_username: credentials.username,
        auth_password: credentials.password,
        uniqueid: uniqueid
    };

    console.log(`Request params:`, params);

    try {
        const response = await axios.get('https://www.015pbx.net/local/api/json/cdrs/get', { params });

        console.log(`PBX API response:`, response.data);

        if (response.data && response.data.responses && response.data.responses[0] && response.data.responses[0].code === 200) {
            console.log('Sending data to frontend...');
            res.json(response.data.data);
        } else {
            console.error('Unexpected response structure or error code from PBX API:', response.data);
            res.status(500).json({ error: 'Unexpected response structure or error code from PBX API', details: response.data });
        }
    } catch (error) {
        console.error('Error fetching data from PBX API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error fetching data from PBX API', details: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
