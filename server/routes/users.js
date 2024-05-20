const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const pool = require('../database');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE user_name = ? AND is_active = 1';
    
    const [results] = await pool.query(query, [username]);
    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (match) {
        const updateLoginTime = 'UPDATE users SET last_login = NOW() WHERE user_id = ?';
        await pool.query(updateLoginTime, [user.user_id]); // עדכון זמן ההתחברות האחרון
        
        const SECRET_KEY = process.env.SECRET_KEY || 'your_very_secret_key_here';
        const token = jwt.sign({
          userId: user.user_id, // הוספת מזהה המשתמש ל־JWT
          username: user.user_name,
          companyId: user.company_id,
          branchId: user.branch_id
        }, SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
          message: 'התחברות מוצלחת',
          token,
          userId: user.user_id, // הוספת מזהה המשתמש לתגובה
          companyId: user.company_id,
          branchId: user.branch_id
        });
      } else {
        return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
      }
    } else {
      return res.status(401).json({ error: 'שם משתמש או סיסמה שגויים' });
    }
  } catch (error) {
    console.error("שגיאה בשרת:", error);
    return res.status(500).json({ error: 'שגיאה בשרת' });
  }
});

module.exports = router;
