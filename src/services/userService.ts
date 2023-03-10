import bcrypt from "bcrypt";

import db from "../db";

interface User {
	id: number;
	email: string;
	username: string;
	password: string;
}

function getUserID(email: string): number | undefined {
	const q = db.prepare(`SELECT id FROM users WHERE email = ?`);
	const match = q.get(email);

	return match?.id;
}

function getUserByID(id: number): User | undefined {
	const q = db.prepare(`SELECT * FROM users WHERE id = ?`);
	const match = q.get(id);

	return match as User;
}

function correctUserDetails(email: string, password: string): number {
	const q = db.prepare(`SELECT id, password FROM users WHERE email = ?`);
	const user = q.get(email);

	if (!user) throw { message: "User not found", status: 400 };
	if (!bcrypt.compareSync(password, user.password)) throw { message: "Incorrect password", status: 401 };

	return user.id;
}

function addUser(email: string, password: string, name: string): number {
	const q = db.prepare(`INSERT INTO users (email, password, name) VALUES (?, ?, ?) RETURNING id`);
	const { id } = q.get(email, bcrypt.hashSync(password, 10), name);

	return id;
}

export { getUserID, getUserByID, correctUserDetails, addUser };
