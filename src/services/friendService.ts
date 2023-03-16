import db from "../db";

function getFriendsByUserID(userID: number) {
	// const q = db.prepare(`
	//     SELECT CASE
	//         WHEN user_id = ? THEN friend_id
	//         ELSE user_id
	//     END AS id, u.name AS name, pending FROM friends
	//     JOIN users u ON u.id = CASE
	//         WHEN user_id = ? THEN friend_id
	//         ELSE user_id
	//     END
	//     WHERE user_id = ? OR friend_id = ?
	// `);
	// const q = db.prepare(`select f1.* from friends f1 inner join friends f2 on f1.user = f2.friend and f1.friend = f2.user where f1.user = ? or f1.friend = ?`);
	const q = db.prepare(`SELECT user, friend, status FROM friends WHERE user = ? OR friend = ?`);
	const friends = q.all(userID, userID);

	return friends;
}

function friendshipExists(userID: number, friendID: number) {
	const q = db.prepare(`SELECT * FROM friends WHERE user IN (?,?) AND friend IN (?,?)`);
	const friendship = q.get(userID, friendID, userID, friendID);

	return friendship;
}

function addFriend(userID: number, friendID: number) {
	const q = db.prepare(`INSERT INTO friends (user, friend) VALUES (?, ?)`);
	const { changes } = q.run(userID, friendID);

	return changes;
}

function acceptFriend(userID: number, friendID: number) {
	const q = db.prepare(`UPDATE friends SET status='accepted' WHERE user = ? AND friend = ?`);
	const { changes } = q.run(friendID, userID);

	return changes;
}

function removeFriend(userID: number, friendID: number) {
	const q = db.prepare(`DELETE FROM friends WHERE user IN (?,?) AND friend IN (?,?)`);
	const { changes } = q.run(userID, friendID, userID, friendID);

	return changes;
}

export { getFriendsByUserID, friendshipExists, addFriend, acceptFriend, removeFriend };
