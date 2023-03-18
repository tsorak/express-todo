import { ResultSetHeader } from "mysql2";

import db from "../db";

interface TodoItem {
	id: number;
	content: string;
	completed: 0 | 1;
}

interface TodoList {
	id: number;
	owner: {
		name: string;
	};
	isOwner: number;
	title: string;
	todos: TodoItem[];
}

async function getTodos(todolistId: number): Promise<TodoItem[] | []> {
	const conn = await db;
	const q = await conn.prepare(`SELECT id, content, completed FROM todos WHERE list_id = ?`);
	const result = await q.execute([todolistId]);
	const todos = result[0] as TodoItem[] | [];
	conn.release();

	return todos;
}

async function getTodoLists(owner: number) {
	const conn = await db;
	const q = await conn.prepare(`CALL get_todo_lists(?)`);
	const result = ((await q.execute([owner])) as unknown[])[0] as unknown[];
	const todo_lists = result[0] as { id: TodoList["id"]; name: TodoList["owner"]["name"]; isOwner: number; title: TodoList["title"] }[] | [];
	conn.release();

	if (todo_lists.length === 0) return [];
	//get every todo list's todos
	const populated_todo_lists = todo_lists.map((list) => {
		return new Promise<TodoList>(async (resolve, _reject) => {
			const obj = {
				id: list.id,
				owner: {
					name: list.name
				},
				isOwner: list.isOwner,
				title: list.title,
				todos: await getTodos(list.id)
			} as TodoList;
			resolve(obj);
		});
	});

	return Promise.all(populated_todo_lists);
}

async function createTodoList(owner: number, title: string) {
	const conn = await db;
	const q = await conn.prepare(`INSERT INTO todo_lists (owner, title) VALUES (?,?)`);
	const result = await q.execute([owner, title]);
	const { insertId } = result[0] as ResultSetHeader;
	conn.release();

	return insertId;
}

async function hasAccessToList(userID: number, todolistId: TodoList["id"]): Promise<boolean> {
	const conn = await db;
	const q = await conn.prepare(`SELECT id FROM todo_lists WHERE id = ? AND owner = ?`);
	const result = await q.execute([todolistId, userID]);
	const hasAccess = (result[0] as { id: number }[]).length > 0;
	conn.release();

	return hasAccess;
}

async function addTodo(todolistId: TodoList["id"], content: string) {
	const conn = await db;
	const q = await conn.prepare(`INSERT INTO todos (list_id, content) VALUES (?,?)`);
	const result = await q.execute([todolistId, content]);
	const { insertId } = result[0] as ResultSetHeader;
	conn.release();

	return { id: insertId, content, completed: false };
}

async function hasAccessToTodo(userID: number, todoId: TodoItem["id"]) {
	const conn = await db;
	const q = await conn.prepare(`SELECT id FROM todo_lists WHERE id = (SELECT list_id FROM todos WHERE id = ?) AND owner = ?`);
	const result = await q.execute([todoId, userID]);
	const hasAccess = (result[0] as { id: number }[]).length > 0;
	conn.release();

	return hasAccess;
}

async function toggleTodo(todoId: TodoItem["id"]) {
	const conn = await db;
	const q = await conn.prepare(`UPDATE todos SET completed = NOT completed WHERE id = ?`);
	const result = await q.execute([todoId]);

	const q2 = await conn.prepare(`SELECT id, content, completed FROM todos WHERE id = ?`);
	const result2 = await q2.execute([todoId]);
	const todo = result2[0] as TodoItem[] | [];
	conn.release();

	return todo[0];
}

async function removeTodo(todoId: TodoItem["id"]) {
	const conn = await db;
	const q = await conn.prepare(`DELETE FROM todos WHERE id = ?`);
	const result = await q.execute([todoId]);
	const { affectedRows } = result[0] as ResultSetHeader;
	conn.release();

	return affectedRows;
}

// async function test() {
// 	console.log("running test");
// 	const q = await toggleTodo(1);
// 	console.log(q);
// }
// test();

export { createTodoList, getTodoLists, hasAccessToList, addTodo, hasAccessToTodo, toggleTodo, removeTodo };
