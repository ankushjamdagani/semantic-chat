const express = require('express');
const router = express.Router();

const { MessageModel } = require('../models');

router.get('/', function (req, res) {
  res.status(200).send({
    code: 200,
    message: 'API works.'
  });
});

// Create a message
router.post('/', (req, res) => {

})

// Get a message
router.get('/:id', (req, res) => {

})

// Delete a message
router.delete('/:id', (req, res) => {

})

// Update a message
router.put('/:id', (req, res) => {

})

module.exports = router;