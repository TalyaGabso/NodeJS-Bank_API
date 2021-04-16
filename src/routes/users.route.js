const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router
	.post("/", usersController.addNewUser)
	.get("/", usersController.getAllUsers)
	.get("/:id", usersController.getUser);

module.exports = router;
