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

});

// Get all Users data
router.get('/', (req, res) => {

});

// Get a User data
router.get('/:id', (req, res) => {

});


// Delete a User
router.delete('/:id', (req, res) => {

});

// Update a User data
router.put('/:id', (req, res) => {

});

module.exports = router;