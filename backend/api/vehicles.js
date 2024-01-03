const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.get('/', async (req, res) => {
  const users = await db.collection('users').get();
  res.json({ success: true, data: users.docs.map(doc => doc.data()), message: 'Users fetched successfully.' });
});

// GET vehicle by ID
router.get('/:id', (req, res) => {
  const vehicleRef = admin.database(`vehicles/${req.params.id}`);
  vehicleRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// POST create new vehicle
router.post('/', (req, res) => {
  const newVehicleRef = admin.database('vehicles').push();
  newVehicleRef.set(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be saved.' + error);
    } else {
      res.status(200).send('Data saved successfully.');
    }
  });
});

// PUT update existing vehicle
router.put('/:id', (req, res) => {
  const vehicleRef = admin.database(`vehicles/${req.params.id}`);
  vehicleRef.update(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be updated.' + error);
    } else {
      res.status(200).send('Data updated successfully.');
    }
  });
});

// DELETE remove vehicle
router.delete('/:id', (req, res) => {
  const vehicleRef = admin.database(`vehicles/${req.params.id}`);
  vehicleRef.remove((error) => {
    if (error) {
      res.status(500).send('Could not delete vehicle.' + error);
    } else {
      res.status(200).send('Vehicle deleted successfully.');
    }
  });
});

module.exports = router;
