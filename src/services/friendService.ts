import { ResultSetHeader } from "mysql2";

import db from "../db";

interface Friend {
	id: number;
	name: string;
	status: string;
	isInitiator: boolean;
}

async function getFriendsByUserID(userID: number): Promise<Friend[] | []> {
	const conn = await db;
	const q = await conn.prepare(`CALL get_friends(?)`);
	const result = ((await q.execute([userID])) as unknown[])[0] as unknown[];
	const friends = result[0] as Friend[] | [];
	conn.release();

	return friends;
}

async function friendshipExists(userID: number, friendID: number): Promise<boolean> {
	const conn = await db;
	const q = await conn.prepare(`SELECT * FROM friends WHERE user IN (?,?) AND friend IN (?,?)`);
	const result = await q.execute([userID, friendID, userID, friendID]);
	const rows = result[0] as any[];
	conn.release();

	if (rows.length > 0) return true;
	return false;
}

async function addFriend(userID: number, friendID: number): Promise<boolean> {
	const conn = await db;
	const q = await conn.prepare(`INSERT INTO friends (user, friend) VALUES (?, ?)`);
	const result = await q.execute([userID, friendID]);
	const { affectedRows } = result[0] as ResultSetHeader;
	conn.release();

	return !!affectedRows;
}

async function acceptFriend(userID: number, friendID: number): Promise<boolean> {
	const conn = await db;
	const q = await conn.prepare(`UPDATE friends SET status='accepted' WHERE user = ? AND friend = ?`);
	const result = await q.execute([friendID, userID]);
	const { changedRows } = result[0] as ResultSetHeader;
	conn.release();

	return !!changedRows;
}

async function removeFriend(userID: number, friendID: number): Promise<boolean> {
	const conn = await db;
	const q = await conn.prepare(`DELETE FROM friends WHERE user IN (?,?) AND friend IN (?,?)`);
	const result = await q.execute([userID, friendID, userID, friendID]);
	const { affectedRows } = result[0] as ResultSetHeader;
	conn.release();

	return !!affectedRows;
}

export { getFriendsByUserID, friendshipExists, addFriend, acceptFriend, removeFriend };
