const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bank.controller");

router
	.put("/deposit/:id", bankController.deposit)
	.put("/update-credit/:id", bankController.updateCredit)
	.put("/withdraw/:id", bankController.withdraw)
	.put("/transfer/:id", bankController.transfer);

module.exports = router;
