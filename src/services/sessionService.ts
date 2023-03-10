import db from "../db";

function addRefreshToken(userID: number, refreshToken: string): number {
	const q = db.prepare(`INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?) RETURNING id`);
	const { id } = q.get(userID, refreshToken);

	return id;
}

function getUserIDbyToken(refreshToken: string): number | undefined {
	const q = db.prepare(`SELECT user_id FROM refresh_tokens WHERE token = ?`);
	const user_id = q.get(refreshToken)?.user_id;

	return user_id;
}

export { addRefreshToken, getUserIDbyToken };
