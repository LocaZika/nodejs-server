const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET users
router.get("/", userController.index);
router.get("/:id", userController.get);
// POST users
router.post("/", userController.post);
// PATCH users
router.patch("/", userController.patch);

module.exports = router;
