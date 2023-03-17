import { Request, Response } from "express";

import { acceptFriend } from "../../services/friendService";

async function acceptFriendController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { id } = req.body;
	if (!id) return res.status(400).json({ error: { message: "Missing id" } });

	const changes = await acceptFriend(jwt.userID, id);
	if (!changes) return res.status(404).json({ error: { message: "Friend not found" } });

	return res.status(200).json({ message: "Friend request accepted" });
}

export default acceptFriendController;
