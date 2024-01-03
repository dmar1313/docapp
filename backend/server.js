const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors()); 

// Parse JSON bodies
app.use(express.json());

// Import routers
const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips');

// Use routers
app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);  
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});