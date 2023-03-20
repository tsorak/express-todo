import { Request, Response } from "express";

import * as userService from "../../services/userService";
import * as todoService from "../../services/todoService";

async function addListController(req: Request, res: Response) {
	const jwt = req.body.jwt as { userID: number };
	const { title } = req.body as { title: string };

	const owner = await userService.getUserByID(jwt.userID);
	if (!owner) return res.status(401).json({ error: { message: "User not found" } });

	const list = {
		id: await todoService.createTodoList(owner.id, title),
		owner: {
			name: owner.name
		},
		isOwner: true,
		title,
		todos: []
	};

	return res.status(201).json(list);
}

export default addListController;
