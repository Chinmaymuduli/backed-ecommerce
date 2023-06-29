const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.put("/:id", userController.updateUser);
router.get("/", userController.getUser);

module.exports = router;
