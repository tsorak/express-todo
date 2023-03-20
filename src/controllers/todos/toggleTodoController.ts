import { Request, Response } from "express";

import * as todoService from "../../services/todoService";

async function toggleTodoController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { todoId } = req.body as { todoId: number };

	const hasAccessToTodo = await todoService.hasAccessToTodo(jwt.userID, todoId);
	if (!hasAccessToTodo) return res.status(403).json({ error: { message: "You do not have access to this todo" } });

	const todo = await todoService.toggleTodo(todoId);

	res.json(todo);
}

export default toggleTodoController;
