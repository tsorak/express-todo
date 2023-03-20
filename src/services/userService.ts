import { ResultSetHeader } from "mysql2";

import bcrypt from "bcrypt";

import db from "../db";

interface User {
	id: number;
	email: string;
	name: string;
	password: string;
}

async function getUserID(email: string): Promise<number | undefined> {
	const conn = await db;
	const q = await conn.prepare(`SELECT id FROM users WHERE email = ?`);
	const result = await q.execute([email]);
	const rows = result[0] as { id: number }[] | [];
	conn.release();

	if (!rows.length) return undefined;

	const { id } = rows[0];
	return id;
}

async function getUserByID(id: number): Promise<User | undefined> {
	const conn = await db;
	const q = await conn.prepare(`SELECT * FROM users WHERE id = ?`);
	const result = (await q.execute([id])) as unknown[];
	const rows = result[0] as User[] | [];
	conn.release();

	if (!rows.length) return undefined;

	const match = rows[0];
	return match;
}

async function getUserByName(name: string): Promise<User | undefined> {
	const conn = await db;
	const q = await conn.prepare(`SELECT * FROM users WHERE name = ?`);
	const result = await q.execute([name]);
	const rows = result[0] as User[] | [];
	conn.release();

	if (!rows.length) return undefined;

	const match = rows[0];
	return match;
}

async function correctUserDetails(email: string, password: string): Promise<number> {
	const conn = await db;
	const q = await conn.prepare(`SELECT id, password FROM users WHERE email = ?`);
	const result = await q.execute([email]);
	const rows = result[0] as User[] | [];
	conn.release();

	if (!rows.length) throw new Error("User not found");

	const user = rows[0];
	const correctPassword = bcrypt.compareSync(password, user.password);
	if (!correctPassword) throw new Error("Incorrect password");

	return user.id;
}

//TODO: generate salt
async function addUser(email: string, password: string, name: string): Promise<number> {
	const conn = await db;
	const q = await conn.prepare(`INSERT INTO users (email, password, name) VALUES (?, ?, ?)`);
	const result = await q.execute([email, bcrypt.hashSync(password, 10), name]);
	const { insertId } = result[0] as ResultSetHeader;
	conn.release();

	return insertId;
}

export { getUserID, getUserByName, correctUserDetails, addUser, getUserByID };
