const express = require("express");
const deleteController = require("../controller/deleteUserController");

const router = express.Router();

router.put("/", deleteController);

module.exports = router;
