// Using Node API with controllers and routes usage has been inspired by the following sources:
// https://medium.com/munchy-bytes/building-an-api-with-node-using-controllers-and-routes-ac58978d663f
// https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers

// Inspired, but code has been modified for personal use

// SETUP
const express = require('express');
const cors = require('cors');
const db = require('./api/helpers/database/db-connector');
const path = require('path');

// Define Routes
const booksRoutes = require('./api/routes/books');
const patronsRoutes = require('./api/routes/patrons');
const transactionsRoutes = require('./api/routes/transactions');
const staffRoutes = require('./api/routes/staff');
const attendancesRoutes = require('./api/routes/attendances');
const eventRoutes = require('./api/routes/events');
const bt_detailsRoutes = require('./api/routes/bt_details');

// PORT SETUP
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Endpoints
app.use('/api/books', booksRoutes);
app.use('/api/patrons', patronsRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/attendances', attendancesRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/bt_details', bt_detailsRoutes);

// Listen on HTTP instead of HTTPS
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
