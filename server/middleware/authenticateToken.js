const jwt = require('jsonwebtoken');

require('dotenv').config(); // מטעין את הגדרות המשתנים מקובץ .env


const SECRET_KEY = process.env.SECRET_KEY || 'your_very_secret_key_here';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("Auth Header:", authHeader); // לוג לכותרת האוטוריזציה

  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token:", token); // לוג לטוקן שנפרד מהכותרת

  if (token == null) {
    return res.sendStatus(401); // אם אין טוקן, החזר Unauthorized
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403); // אם הטוקן לא תקף, החזר Forbidden
    }
    req.user = user;
    next(); // המשך לנקודת הקצה המבוקשת
  });
}

module.exports = authenticateToken;
