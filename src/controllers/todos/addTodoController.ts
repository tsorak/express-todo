import { Request, Response } from "express";

import * as todoService from "../../services/todoService";

async function addTodoController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { todolistId, content } = req.body;

	const hasAccess = await todoService.hasAccessToList(jwt.userID, todolistId);
	if (!hasAccess) return res.status(403).json({ error: { message: "You don't have access to this list" } });

	const todo = await todoService.addTodo(todolistId, content);

	res.status(201).json(todo);
}

export default addTodoController;
