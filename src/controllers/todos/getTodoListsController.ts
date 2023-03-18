import { Request, Response } from "express";

import * as todoService from "../../services/todoService";
import * as userService from "../../services/userService";

async function getTodoListsController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;

	const user = userService.getUserByID(jwt.userID);
	if (!user) return res.status(401).json({ error: { message: "User not found" } });

	const todo_lists = await todoService.getTodoLists(jwt.userID);

	res.status(200).json(todo_lists);
}

export default getTodoListsController;
