const bcrypt = require('bcrypt');
const pool = require('../database'); // ודא שהנתיב לקובץ database.js נכון

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [users] = await pool.query(query, [username]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (match) {
      res.status(200).json({ message: 'התחברות מוצלחת' });
    } else {
      res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};

module.exports = {
  login,
};
