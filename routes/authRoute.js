const express = require("express");
const router = express.Router();
const authRoute = require("../controllers/authController");

// router.get("/", authRoute.index);
router.post("/register", authRoute.register);
router.post("/verify/:id", authRoute.verifyAccount);
router.post("/login", authRoute.login);
