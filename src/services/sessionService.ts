import { ResultSetHeader } from "mysql2";
import db from "../db";

//returns the id: number of the inserted row (amount of rows inserted)
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

// async function test() {
// 	const id = await addRefreshToken(1, "123");
// 	console.log("addRefreshToken:", id);

// 	const userID = await getUserIDbyToken("123");
// 	console.log("getUserIDbyToken:", userID);
// }
// test();

export { addRefreshToken, getUserIDbyToken };
