const express = require('express');
const router = express.Router();
const { admin } = require('./firebaseAdmin');// GET all drivers
router.get('/', async (req, res) => {
  try {
    const driversSnapshot = await admin.firestore().collection('drivers').get();
    const drivers = driversSnapshot.docs.map(doc => doc.data());
    res.json({ success: true, data: drivers, message: 'Drivers fetched successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Failed to fetch drivers.' });
  }
});

// GET a specific driver by ID
router.get('/:id', async (req, res) => {
  try {
    const driverId = req.params.id;
    const driverSnapshot = await admin.firestore().collection('drivers').doc(driverId).get();
    const driver = driverSnapshot.data();
    if (driver) {
      res.json({ success: true, data: driver, message: 'Driver fetched successfully.' });
    } else {
      res.status(404).json({ success: false, data: null, message: 'Driver not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Failed to fetch driver.' });
  }
});

// POST a new driver
router.post('/', async (req, res) => {
  try {
    const newDriver = req.body;
    const driverRef = await admin.firestore().collection('drivers').add(newDriver);
    res.status(201).json({ success: true, data: { id: driverRef.id }, message: 'Driver created successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Failed to create driver.' });
  }
});

// PUT (update) a driver
router.put('/:id', async (req, res) => {
  try {
    const driverId = req.params.id;
    const updatedData = req.body;
    await admin.firestore().collection('drivers').doc(driverId).update(updatedData);
    res.json({ success: true, data: null, message: 'Driver updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Failed to update driver.' });
  }
});

// DELETE a driver
router.delete('/:id', async (req, res) => {
  try {
    const driverId = req.params.id;
    await admin.firestore().collection('drivers').doc(driverId).delete();
    res.json({ success: true, data: null, message: 'Driver deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: 'Failed to delete driver.' });
  }
});

module.exports = router;