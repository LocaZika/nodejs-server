const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET products
router.get("/", productController.index);
router.get("/:id", productController.get);
// POST products
router.post("/", productController.post);
// PATCH products
// router.patch("/products", productController.patch);

module.exports = router;
