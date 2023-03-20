import { ResultSetHeader } from "mysql2";

import db from "../db";

async function addRefreshToken(userID: number, refreshToken: string): Promise<number> {
	const conn = await db;
	const q = await conn.prepare(`INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)`);
	const result = await q.execute([userID, refreshToken]);
	const { insertId } = result[0] as ResultSetHeader;
	conn.release();

	return insertId;
}

async function getUserIDbyToken(refreshToken: string): Promise<number | undefined> {
	const conn = await db;
	const q = await conn.prepare(`SELECT user_id FROM refresh_tokens WHERE token = ?`);
	const result = await q.execute([refreshToken]);
	const rows = result[0] as { user_id: number }[] | [];
	conn.release();

	if (!rows.length) return undefined;
	const { user_id } = rows[0] as { user_id: number };

	return user_id;
}

export { addRefreshToken, getUserIDbyToken };
