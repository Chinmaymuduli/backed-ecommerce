const express = require("express");
const ProductControl = require("../controller/productController");

const router = express.Router();

router.post("/create", ProductControl.createProduct);
router.get("/", ProductControl.getProducts);
router.get("/:id", ProductControl.getProductsById);
router.delete("/:id", ProductControl.deleteProduct);
router.put("/:id", ProductControl.updateProduct);

module.exports = router;
