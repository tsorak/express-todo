import { sign, verify } from "jsonwebtoken";

const key = process.env.ACCESS_TOKEN_SECRET || "secret";

function generateAccessToken(userID: number) {
	return sign({ userID }, key, { expiresIn: "1h" });
}

function generateRefreshToken() {
	return sign({}, key, { expiresIn: "7d" });
}

function validateToken(token: string) {
	return verify(token, key);
}

export { generateAccessToken, generateRefreshToken, validateToken };
