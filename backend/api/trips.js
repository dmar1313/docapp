const express = require('express');
const router = express.Router();
const { admin } = require('./firebaseAdmin.js');

// Create a new trip
router.post('/', (req, res) => {
  const newTripRef = admin.database().ref('trips').push();
  newTripRef.set(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be saved.' + error);
    } else {
      res.status(200).send('Trip saved successfully.');
    }
  });
});

// Get all trips
router.get('/', (req, res) => {
  const tripsRef = admin.database().ref('trips');
  tripsRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// Get a trip by id
router.get('/:id', (req, res) => {
  const tripRef = admin.database().ref(`trips/${req.params.id}`);
  tripRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// Update a trip
router.put('/:id', (req, res) => {
  const tripRef = admin.database().ref(`trips/${req.params.id}`);
  tripRef.update(req.body, (error) => {
    if (error) {
      res.status(500).send('Trip could not be updated.' + error);
    } else {
      res.status(200).send('Trip updated successfully.');
    }
  });
});

// Delete a trip
router.delete('/:id', (req, res) => {
  const tripRef = admin.database().ref(`trips/${req.params.id}`);
  tripRef.remove((error) => {
    if (error) {
      res.status(500).send('Could not delete trip.' + error);
    } else {
      res.status(200).send('Trip deleted successfully.');
    }
  });
});

module.exports = router; // make sure to export the router

