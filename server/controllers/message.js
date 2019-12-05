const express = require("express");
const router = express.Router();

const { MessageModel } = require("../models");

const { constructRestResponse } = require("../helpers");

router.get("/", res =>
  res.status(200).send(constructRestResponse(200, "SUCCESS", "Auth API works."))
);

// Create a message
router.post("/", (req, res) => {
  res.status(200).send(constructRestResponse(200, "SUCCESS", "TODO"));
});

// Get a message
router.get("/:id", (req, res) => {
  res.status(200).send(constructRestResponse(200, "SUCCESS", "TODO"));
});

// Delete a message
router.delete("/:id", (req, res) => {
  res.status(200).send(constructRestResponse(200, "SUCCESS", "TODO"));
});

// Update a message
router.put("/:id", (req, res) => {
  res.status(200).send(constructRestResponse(200, "SUCCESS", "TODO"));
});

module.exports = router;
