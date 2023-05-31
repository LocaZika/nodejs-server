const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET products
router.get("/products", productController.index);
router.get("/products/:id", productController.get);
// POST products
router.post("/products", productController.post);
// PATCH products
// router.patch("/products", productController.patch);

module.exports = router;
