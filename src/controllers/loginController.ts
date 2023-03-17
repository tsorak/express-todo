import { Request, Response } from "express";

import { correctUserDetails } from "../services/userService";
import { createSession } from "../session";

const loginController = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ error: { message: "Missing email or password" } });

	try {
		const userID = await correctUserDetails(email, password);

		createSession(userID, res);
		return res.status(200).end();
	} catch (error: unknown) {
		if (typeof error !== "object" || error === null) return res.status(500).end();
		const err = error as { message: string; status: number };

		return res.status(err.status).json({ error: { message: err.message } });
	}
};

export default loginController;
