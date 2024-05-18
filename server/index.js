const express = require('express');
const cors = require('cors');
const app = express();

const pool = require('./database');
const authenticateToken = require('./middleware/authenticateToken');
const carsRouter = require('./routes/cars');
const colorsRouter = require('./routes/colors');
const customersRouter = require('./routes/customers');
const usersRouter = require('./routes/users');
const linksRouter = require('./routes/links');
const dropdownDataRouter = require('./routes/dropdownDataRouter'); // Import the new router
const transportMinistryData = require('./routes/transportMinistryDataRouter'); // Import the new router


app.use(cors());
app.use(express.json());
require('dotenv').config();

app.use('/api/cars', carsRouter);
app.use('/api/colors', colorsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/users', usersRouter);
app.use('/api/links', linksRouter);
app.use('/api/data', dropdownDataRouter); // Use the new router under a specific path
app.use('/api/transportMinistryData', transportMinistryData);

app.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Hello from server!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});

