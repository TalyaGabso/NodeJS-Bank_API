const fs = require("fs");
const bankJson = require("../config/bank.json");

// Deposit: deposit amount to cash to a user by id
const deposit = (req, res) => {
	// input
	const { id } = req.params;
	const amount = req.body;
	const currentUserData = bankJson.users.find((user) => user.id == id);
	// validation

	// response
	currentUserData.cash += amount.cash;
	const newData = JSON.stringify(bankJson);
	fs.writeFileSync("./src/config/bank.json", newData);
	res.status(200).send({
		bankJson,
		success: `Deposit successful, the current balance is $${currentUserData.cash}`,
	});
};
// update Credit: ONLY add credit
const updateCredit = (req, res) => {
	// input
	const { id } = req.params;
	const update = req.body;
  console.log(id);
  console.log(update);
	const currentUserData = bankJson.users.find((user) => user.id == id);
	// validation

	// response
	currentUserData.credit += update.credit;
	const newData = JSON.stringify(bankJson);
	fs.writeFileSync("./src/config/bank.json", newData);
	res.status(200).send({
		bankJson,
		success: `Credit was successfully updated, the current credit is $${currentUserData.credit}`,
	});
};
// Withdraw: withdraw cash from a user (cash can be in minus base on credit limit)
// Transfer: transfer cash between users (cash can be in minus base on credit limit)
module.exports = {
	deposit,
	updateCredit,
};
