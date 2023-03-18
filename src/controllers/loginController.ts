import { Request, Response } from "express";

import { correctUserDetails } from "../services/userService";
import { createSession } from "../session";

const loginController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const userID = await correctUserDetails(email, password);

		createSession(userID, res);
		return res.status(200).end();
	} catch (error) {
		const err = error as Error;
		console.log(err); //misc: log to disk to keep track of failed logins

		//The error message is either "Incorrect password" or "User not found", send Bad Request to prevent potential attackers from brute-forcing logins.
		return res.status(400).json({ error: { message: "Invalid credentials" } });
	}
};

export default loginController;
