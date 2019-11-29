const express = require('express');
const router = express.Router();

const { UserModel } = require('../models');

const {
  constructResponse
} = require('../helpers');

router.get('/', res => res.status(200).send(constructResponse(200, 'SUCCESS', 'API works.')));

// Create a new User
router.post('/', (req, res) => {
  res.status(200).send(constructResponse(200, 'SUCCESS', 'TODO'));
});

// Get all Users data
router.get('/', (req, res) => {
  res.status(200).send(constructResponse(200, 'SUCCESS', 'TODO'));
});

// Get a User data
router.get('/:id', (req, res) => {
  res.status(200).send(constructResponse(200, 'SUCCESS', 'TODO'));
});


// Delete a User
router.delete('/:id', (req, res) => {
  res.status(200).send(constructResponse(200, 'SUCCESS', 'TODO'));
});

// Update a User data
router.put('/:id', (req, res) => {
  res.status(200).send(constructResponse(200, 'SUCCESS', 'TODO'));
});

module.exports = router;