import { Request, Response } from "express";

import { addUser, getUserID } from "../services/userService";
import { createSession } from "../session";

const registerController = (req: Request, res: Response) => {
	const { email, password, name } = req.body;
	if (!email || !password || !name) return res.status(400).send("Bad Request");
	if (getUserID(email) !== undefined) return res.status(409).send("Email already in use");

	const addedUserID = addUser(email, password, name);

	createSession(addedUserID, res);
	return res.status(201).end();
};

export default registerController;
