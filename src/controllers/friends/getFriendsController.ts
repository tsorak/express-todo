import { Request, Response } from "express";

import { getFriendsByUserID } from "../../services/friendService";

function getFriendsController(req: Request, res: Response) {
	const jwt: { userID: number } = req.body.jwt;

	//TODO: return friends with their names and ids

	return res.status(200).json(getFriendsByUserID(jwt.userID));
}

export default getFriendsController;
