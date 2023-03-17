import { Request, Response } from "express";

import { addUser, getUserID } from "../services/userService";
import { createSession } from "../session";

const registerController = async (req: Request, res: Response) => {
	const { email, password, username } = req.body;
	if (!email || !password || !username) return res.status(400).send("Bad Request");
	if ((await getUserID(email)) !== undefined) return res.status(409).send("Email already in use");

	const addedUserID = await addUser(email, password, username);

	createSession(addedUserID, res);
	return res.status(201).end();
};

export default registerController;
