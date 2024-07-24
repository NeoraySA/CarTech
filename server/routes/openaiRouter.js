const express = require('express');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const router = express.Router();
const pool = require('../database');

const upload = multer({ storage: multer.memoryStorage() });

async function getApiKey() {
    try {
        const [rows] = await pool.query("SELECT api_key FROM api_keys WHERE service_name = ?", ['openai']);
        if (rows.length === 0) {
            throw new Error('API key not found for OpenAI');
        }
        return rows[0].api_key;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to retrieve API key from database');
    }
}

router.post('/send-image', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    let apiKey;
    try {
        apiKey = await getApiKey();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

    const formData = new FormData();
    formData.append('file', req.file.buffer, req.file.originalname);
    formData.append('purpose', 'assistants');

    try {
        const uploadResponse = await axios.post('https://api.openai.com/v1/files', formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                ...formData.getHeaders()
            }
        });

        if (uploadResponse.status !== 200) {
            throw new Error('Failed to upload file to OpenAI');
        }

        const fileId = uploadResponse.data.id;

        const assistantResponse = await axios.post('https://api.openai.com/v1/assistants/<assistant_id>/messages', {
            thread_id: '<thread_id>',
            messages: [{
                role: "user",
                content: {
                    image_file: {
                        file_id: fileId
                    }
                }
            }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        res.json(assistantResponse.data);
    } catch (error) {
        console.error('Failed to upload image or send to assistant:', error);
        res.status(500).json({ error: 'Failed to process image: ' + error.message });
    }
});

module.exports = router;
