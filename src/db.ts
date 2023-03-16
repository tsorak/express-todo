import Database from "better-sqlite3";

const db = new Database("dev.db", { verbose: console.log });

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL,
		name TEXT NOT NULL
	);
    CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        token TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS friends (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user INTEGER NOT NULL,
        friend INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT "pending",
        CONSTRAINT unique_friends UNIQUE (user, friend),
        FOREIGN KEY (user) REFERENCES users(id),
        FOREIGN KEY (friend) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`);

export default db;
