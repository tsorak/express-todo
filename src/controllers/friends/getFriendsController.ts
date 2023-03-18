import { Request, Response } from "express";

import { getFriendsByUserID } from "../../services/friendService";

async function getFriendsController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;

	return res.status(200).json(await getFriendsByUserID(jwt.userID));
}

export default getFriendsController;
