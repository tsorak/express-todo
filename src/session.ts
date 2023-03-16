import { Request, Response, NextFunction } from "express";
import * as cookie from "cookie";

import { generateAccessToken, generateRefreshToken, validateToken } from "./authorisation";
import { addRefreshToken } from "./services/sessionService";

function createSession(userID: number, res: Response): void {
	const refreshToken = generateRefreshToken();

	addRefreshToken(userID, refreshToken);

	res.cookie("refreshToken", refreshToken, { domain: "localhost", path: "/", maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
	res.cookie("accessToken", generateAccessToken(userID), { domain: "localhost", path: "/", maxAge: 1000 * 60 * 60, httpOnly: true });
	res.cookie("idToken", userID, { domain: "localhost", path: "/", maxAge: 1000 * 60 * 60, httpOnly: false });
}

function verifySession(req: Request, res: Response, next: NextFunction) {
	const { accessToken } = cookie.parse(req.headers.cookie || "");

	let payload: { userID: number } | undefined;
	try {
		payload = validateToken(accessToken) as { userID: number };
		console.log(`Access was granted on '${req.url}' to user with id: ${payload.userID ?? "ERR"}`);

		req.body ? (req.body.jwt = payload) : (req.body = { jwt: payload });
		return next();
	} catch (error) {
		console.log(`Access was denied on '${req.url}'`);
		return res.status(401).end();
	}
}

export { createSession, verifySession };
