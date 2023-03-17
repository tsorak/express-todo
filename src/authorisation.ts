import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const key: string = process.env.ACCESS_TOKEN_SECRET || "";
if (!key) throw new Error("Please assign a value for ACCESS_TOKEN_SECRET in a .env file in the project root");

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
