const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET users
router.get("/users", userController.index);
router.get("/users/:id", userController.get);
// POST users
router.post("/users", userController.post);
// PATCH users
router.patch("/users", userController.patch);

module.exports = router;
