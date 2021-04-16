const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bank.controller");

router
	.put("/deposit/:id", bankController.deposit)
	.put("/update-credit/:id", bankController.updateCredit);

module.exports = router;
