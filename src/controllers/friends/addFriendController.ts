import { Request, Response } from "express";

import { addFriend, friendshipExists } from "../../services/friendService";
import { getUserByName } from "../../services/userService";

async function addFriendController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { username } = req.body as { username: string };

	const friend = await getUserByName(username);
	if (!friend) return res.status(404).json({ error: { message: "User not found" } });

	if (friend.id === jwt.userID) return res.status(400).json({ error: { message: "You can not add yourself as a friend" } });

	const friendship = await friendshipExists(jwt.userID, friend.id);
	if (friendship) return res.status(400).json({ error: { message: "Friendship already exists" } });

	addFriend(jwt.userID, friend.id);

	return res.status(200).json({ id: friend.id, name: friend.name, status: "pending", isInitiator: true });
}

export default addFriendController;
