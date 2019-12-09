const express = require("express");
const router = express.Router();

const { MessageModel } = require("../models");

const { constructRestResponse } = require("../helpers");

const _message = new MessageModel();

// Create a message
router.post("/", async (req, res) => {
  try {
    const message = await _message.createMessage(req.body);
    res.status(200).send(constructRestResponse(200, "SUCCESS", message));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Get all messages or from filters
router.get("/", async (req, res) => {
  try {
    const messages = await _message.getMessages(req.body);
    res.status(200).send(constructRestResponse(200, "SUCCESS", messages));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Get message from id
router.get("/:id", async (req, res) => {
  try {
    const message = await _message.getMessageFromId(req.params.id);
    res.status(200).send(constructRestResponse(200, "SUCCESS", message));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Delete a message
router.delete("/:id", async (req, res) => {
  try {
    const response = await _message.removeMessage(req.params.id);
    res.status(200).send(constructRestResponse(200, "SUCCESS", response));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Update a message
router.put("/:id", async (req, res) => {
  try {
    const message = await _message.updateMessage(req.params.id, req.body);
    res.status(200).send(constructRestResponse(200, "SUCCESS", message));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

module.exports = router;
