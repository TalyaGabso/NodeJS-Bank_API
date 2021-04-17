const fs = require("fs");
const bankJson = require("../config/bank.json");
//----------Validations----------//
const validateInput = (id, amount, currentUserData, res) => {

	if (!id || !currentUserData) {
		return res.status(200).json({ error: `User ${id} does not exist.` });
	} else if (!amount || amount <= 0 || isNaN(amount)) {
		return res.status(200).json({ error: `Please enter a valid amount` });
	}
};
const checkUserTotalAmount = (currentUserTotalAmount, amount) => {
	if (amount > currentUserTotalAmount) {
		return res.status(200).json({
			error: `Unable to withdraw, your total available amount is $${currentUserTotalAmount}`,
		});
	}
};
const validateTransfer = (transferToData, currentUserData, transferToId) => {
	if (!transferToData) {
		return res.status(200).json({ error: `user ${transferToId} does not exist` });
	} else if (transferToData.id === currentUserData.id) {
		return res.status(200).json({ error: "invalid action" });
	}
};
//----------Controllers----------//
// Deposit: deposit amount to cash to a user by id
const deposit = (req, res) => {
	// input
	const { id } = req.params;
	const amount = req.body.cash;
	const currentUserData = bankJson.users.find((user) => user.id == id);

	// validation
	if (!validateInput(id, amount, currentUserData, res)) {
		// response
		currentUserData.cash += parseInt(amount);
		const newData = JSON.stringify(bankJson);
		fs.writeFileSync("./src/config/bank.json", newData);
		res.status(200).send({
			success: `Deposit successful, the current balance is $${currentUserData.cash}`,
		});
	}
};

// update Credit: ONLY add credit
const updateCredit = (req, res) => {
	// input
	const { id } = req.params;
	const amount = req.body.credit;

	const currentUserData = bankJson.users.find((user) => user.id == id);
	// validation
	if (!validateInput(id, amount, currentUserData, res)) {
		// response
		currentUserData.credit += parseInt(amount);
		const newData = JSON.stringify(bankJson);
		fs.writeFileSync("./src/config/bank.json", newData);
		res.status(200).send({
			success: `Credit was successfully updated, the current credit is $${currentUserData.credit}`,
		});
	}
};
// Withdraw: withdraw cash from a user (cash can be in minus base on credit limit)
const withdraw = (req, res) => {
	// input
	const { id } = req.params;
	const amount = req.body.cash;

	const currentUserData = bankJson.users.find((user) => user.id == id);
	const currentUserTotalAmount = currentUserData.credit + currentUserData.cash;

	// validation
	if (!validateInput(id, amount, currentUserData, res)) {
		if (!checkUserTotalAmount(currentUserTotalAmount, amount)) {
			// response
			currentUserData.cash -= parseInt(amount);
			const newData = JSON.stringify(bankJson);
			fs.writeFileSync("./src/config/bank.json", newData);
			res.status(200).send({
				bankJson,
				success: `Withraw was successful, your current balance is $${currentUserData.cash}`,
			});
		}
	}
};
// Transfer: transfer cash between users (cash can be in minus base on credit limit)
const transfer = (req, res) => {
	// input
	const { id } = req.params;
	const amount = req.body.cash;
	const transferToId = req.body.id;

	const currentUserData = bankJson.users.find((user) => user.id == id);
	const currentUserTotalAmount = currentUserData.cash + currentUserData.credit;
	const transferToData = bankJson.users.find((user) => user.id == transferToId);
	// validation
	if (!validateInput(id, amount, currentUserData, res)) {
		if (!checkUserTotalAmount(currentUserTotalAmount, amount)) {
			if (!validateTransfer(transferToData, currentUserData, transferToId)) {
				// response
				currentUserData.cash -= parseInt(amount);
				transferToData.cash += parseInt(amount);
				const newData = JSON.stringify(bankJson);
				fs.writeFileSync("./src/config/bank.json", newData);
				res.status(200).send({
					bankJson,
					success: `Transfer was successful`,
				});
			}
		}
	}
};
module.exports = {
	deposit,
	updateCredit,
	withdraw,
	transfer,
};