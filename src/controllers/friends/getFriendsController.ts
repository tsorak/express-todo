import { Request, Response } from "express";

import { getFriendsByUserID } from "../../services/friendService";

async function getFriendsController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;

	const usersFriends = await getFriendsByUserID(jwt.userID);
	return res.status(200).json(usersFriends);
}

export default getFriendsController;
