const fs = require("fs");
const bankJson = require("../config/bank.json");

// add users to the bank, each user has : passport id, cash (default 0), credit(default0)
const addNewUser = (req, res) => {
	// input
	const { id } = req.body;

	//----------vallidations----------//
	if (!id) {
		//didnt enter an id
		return res.status(200).json({ error: "Please Enter a Passport Id" });
	} else if (bankJson.users.find((user) => user.id == id)) {
		//user already exist in the database
		return res.status(200).json({ error: "User already axist in the database" });
	} else if (String(req.body.id).length !== 9) {
		// input too short/long
		return res.status(200).json({ error: "Passport Id must be  9 digits" });
	} else if (typeof id === "string") {
		//add error: input included symbols/letters
		return res.status(200).json({ error: "Please Enter a Valid Passport Id" });
	}
	// response
	else bankJson.users.push({ id, cash: 0, credit: 0 });
	const newData = JSON.stringify(bankJson);
	fs.writeFileSync("./src/config/bank.json", newData);
	res.status(200).send({ success: "new user was added" });
};

//show all users
const getAllUsers = (req, res) => {
	res.status(200).json({ users: bankJson.users });
};

// show a particular user details
const getUser = (req, res) => {
	// input
	const { id } = req.params;
	const currentUserData = bankJson.users.find((user) => user.id == id);
	//----------vallidations----------//
	if (!currentUserData) {
		if (id.length !== 9) {
			// input too short/long
			return res
				.status(200)
				.json({ error: "to get a user Passport Id must be  9 digits" });
		}
		//user does not exist
		else
			res.status(200).json({
				error: "User does not exist, please check input.",
			});
	}
	// response
	else res.status(200).json({ user: currentUserData });
};

module.exports = {
	addNewUser,
	getAllUsers,
	getUser,
};
