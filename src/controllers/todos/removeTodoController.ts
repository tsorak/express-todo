import { Request, Response } from "express";

import * as todoService from "../../services/todoService";

async function removeTodoController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { todoId } = req.body;

	const hasAccess = await todoService.hasAccessToTodo(jwt.userID, todoId);
	if (!hasAccess) return res.status(403).json({ error: { message: "You do not have access to this todo" } });

	const todo = await todoService.removeTodo(todoId);

	if (todo < 1) return res.status(404).json({ error: { message: "Todo not found" } });

	return res.status(200).end();
}

export default removeTodoController;
