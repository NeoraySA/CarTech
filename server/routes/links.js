const express = require('express');
const router = express.Router();
const pool = require('../database');

const generateShortUrl = () => {
  return Math.random().toString(36).substring(2, 8);
};

router.post('/', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    const shortUrl = generateShortUrl();
    
    console.log(`Attempting to insert: ${originalUrl} with short URL: ${shortUrl}`);
    await pool.query('INSERT INTO links (original_url, short_url) VALUES (?, ?)', [originalUrl, shortUrl]);
    
    res.status(201).json({ originalUrl, shortUrl: `http://localhost:${process.env.PORT || 3001}/${shortUrl}` });
  } catch (error) {
    console.error('Failed to create the link:', error);
    res.status(500).json({ error: 'Failed to create the link' });
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('Fetching all links');
    const [results] = await pool.query('SELECT * FROM links');
    res.json(results);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log(`Redirecting short URL: ${shortUrl}`);
    
    const [results] = await pool.query('SELECT original_url FROM links WHERE short_url = ?', [shortUrl]);
    if (results.length === 0) {
      console.log('Short URL not found:', shortUrl);
      res.status(404).json({ error: 'Link not found' });
      return;
    }

    const originalUrl = results[0].original_url;
    console.log(`Redirecting to original URL: ${originalUrl}`);
    res.redirect(originalUrl);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
