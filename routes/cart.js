const express = require("express");
const ProductCartModel = require("../controller/cartController");
const router = express.Router();

router.post("/", ProductCartModel.createAddToCart);
router.get("/:id", ProductCartModel.getCartProduct);

module.exports = router;
