const express = require('express');
const router = express.Router();
const { admin } = require('./firebaseAdmin');

router.get('/', async (req, res) => {
  const users = await admin.collection('users').get();
  res.json({ success: true, data: users.docs.map(doc => doc.data()), message: 'Users fetched successfully.' });
});

// GET user by ID
router.get('/:id', (req, res) => {
    const userRef = admin.database().ref(`users/${req.params.id}`);
    userRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
            res.json({ success: true, data: snapshot.val(), message: 'User fetched successfully.' });
        } else {
            res.status(404).json({ success: false, data: null, message: 'User not found.' });
        }
    }, error => {
        res.status(500).json({ success: false, data: null, message: 'Failed to fetch user. ' + error });
    });
});

// POST create new user
router.post('/', (req, res) => {
    const newUserRef = admin.database().ref('users').push();
    newUserRef.set(req.body, (error) => {
        if (error) {
            res.status(500).json({ success: false, data: null, message: 'Data could not be saved. ' + error });
        } else {
            res.status(201).json({ success: true, data: { id: newUserRef.key }, message: 'Data saved successfully.' });
        }
    });
});

// PUT update existing user
router.put('/:id', (req, res) => {
    const userRef = admin.database().ref(`users/${req.params.id}`);
    userRef.update(req.body, (error) => {
        if (error) {
            res.status(500).json({ success: false, data: null, message: 'Data could not be updated. ' + error });
        } else {
            res.json({ success: true, data: null, message: 'Data updated successfully.' });
        }
    });
});

// DELETE remove user
router.delete('/:id', (req, res) => {
    const userRef = admin.database().ref(`users/${req.params.id}`);
    userRef.remove((error) => {
        if (error) {
            res.status(500).json({ success: false, data: null, message: 'Could not delete user. ' + error });
        } else {
            res.json({ success: true, data: null, message: 'User deleted successfully.' });
        }
    });
});

module.exports = router;
