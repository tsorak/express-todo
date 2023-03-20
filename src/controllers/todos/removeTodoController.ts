import { Request, Response } from "express";

import * as todoService from "../../services/todoService";

async function removeTodoController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { todoId } = req.body as { todoId: number };

	const hasAccess = await todoService.hasAccessToTodo(jwt.userID, todoId);
	if (!hasAccess) return res.status(403).json({ error: { message: "You do not have access to this todo" } });

	const changes = await todoService.removeTodo(todoId);

	if (changes < 1) return res.status(404).json({ error: { message: "Todo not found" } });

	return res.status(200).end();
}

export default removeTodoController;
