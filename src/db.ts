import * as mysql from "mysql2/promise";

import * as dotenv from "dotenv";
dotenv.config();

const db = mysql
	.createPool({
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT || "3306"),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: "todo_tsorak",
		waitForConnections: true,
		connectionLimit: 10
	})
	.getConnection();

export default db;
