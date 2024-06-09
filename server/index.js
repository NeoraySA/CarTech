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
const dropdownDataRouter = require('./routes/dropdownDataRouter');
const transportMinistryData = require('./routes/transportMinistryDataRouter');
const rentalsRouter = require('./routes/rentals'); // Import the new router
const settingsRouter = require('./routes/settings'); // Import the new router for settings
const carCategoriesRouter = require('./routes/carCategories'); // Import the new router for car categories

app.use(cors());
app.use(express.json());
require('dotenv').config();

app.use('/api/rentals', rentalsRouter); // Use the new router
app.use('/api/cars', carsRouter);
app.use('/api/colors', colorsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/users', usersRouter);
app.use('/api/links', linksRouter);
app.use('/api/data', dropdownDataRouter); // Use the new router under a specific path
app.use('/api/transportMinistryData', transportMinistryData);
app.use('/api/settings', settingsRouter); // Use the new router for settings
app.use('/api/carCategories', carCategoriesRouter); // Use the new router for car categories

app.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Hello from server!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});
