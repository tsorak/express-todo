import { Request, Response } from "express";
import { addFriend, friendshipExists } from "../../services/friendService";
import { getUserByName } from "../../services/userService";

async function addFriendController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { username } = req.body;

	const friend = await getUserByName(username);
	if (!friend) return res.status(404).json({ error: { message: "User not found" } });

	if (friend.id === jwt.userID) return res.status(400).json({ error: { message: "You can not add yourself as a friend" } });

	const friendship = await friendshipExists(jwt.userID, friend.id);

	if (friendship) return res.status(400).json({ error: { message: "Friendship already exists" } });

	addFriend(jwt.userID, friend.id);

	// TODO: return friend name and id

	return res.status(200).json({ user: jwt.userID, friend: friend.id, status: "pending" });
}

export default addFriendController;
