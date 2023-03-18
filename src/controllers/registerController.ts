import { Request, Response } from "express";

import { addUser, getUserID } from "../services/userService";
import { createSession } from "../session";

const registerController = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;
	const emailExists = (await getUserID(email)) !== undefined;
	if (emailExists) return res.status(409).json({ error: { message: "Email already in use" } });

	const addedUserID = await addUser(email, password, username);

	createSession(addedUserID, res);
	return res.status(201).end();
};

export default registerController;
