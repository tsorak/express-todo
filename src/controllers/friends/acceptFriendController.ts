import { Request, Response } from "express";

import { acceptFriend } from "../../services/friendService";

async function acceptFriendController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;
	const { id } = req.body as { id: number };

	const changes = await acceptFriend(jwt.userID, id);
	//Friend was not found or the friend-request was already accepted, or removed by the sender
	if (!changes) return res.status(404).json({ error: { message: "Friend not found" } });

	return res.status(200).json({ message: "Friend request accepted" });
}

export default acceptFriendController;
