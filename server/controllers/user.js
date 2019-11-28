const express = require('express');
const router = express.Router();

const { UserModel } = require('../models');

router.get('/', function (req, res) {
  res.status(200).send({
    code: 200,
    message: 'API works.'
  });
});

// Create a new User
router.post('/', (req, res) => {
  res.send('Todo');
});

// Get all Users data
router.get('/', (req, res) => {
  res.send('Todo');
});

// Get a User data
router.get('/:id', (req, res) => {
  res.send('Todo');
});


// Delete a User
router.delete('/:id', (req, res) => {
  res.send('Todo');
});

// Update a User data
router.put('/:id', (req, res) => {
  res.send('Todo');
});

module.exports = router;