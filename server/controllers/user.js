const express = require("express");
const router = express.Router();

const { UserModel } = require("../models");

const { constructRestResponse, parseUserDataToSend } = require("../helpers");

const _user = new UserModel();

// // Create a new User
// router.post("/", (req, res) => {
//   res
//     .status(200)
//     .send(
//       constructRestResponse(200, "SUCCESS", { TODO: req.isAuthenticated() })
//     );
// });

// Get all Users data
router.get("/", async (req, res) => {
  try {
    const users = (await _user.getUsers()).map(user =>
      parseUserDataToSend(user)
    );
    res.status(200).send(constructRestResponse(200, "SUCCESS", users));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Get a User data
router.get("/:id", async (req, res) => {
  try {
    const user = parseUserDataToSend(await _user.getUserFromId(req.params.id));
    res.status(200).send(constructRestResponse(200, "SUCCESS", user));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Delete a User
router.delete("/:id", async (req, res) => {
  try {
    const response = await _user.removeUser(req.params.id);
    res.status(200).send(constructRestResponse(200, "SUCCESS", response));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

// Update a User data
router.put("/:id", async (req, res) => {
  try {
    const user = parseUserDataToSend(
      await _user.updateUser(req.params.id, req.body)
    );
    res.status(200).send(constructRestResponse(200, "SUCCESS", user));
  } catch (err) {
    res.status(400).send(constructRestResponse(400, "ERROR", err));
  }
});

module.exports = router;
