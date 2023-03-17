DROP DATABASE IF EXISTS todo_tsorak;
CREATE DATABASE todo_tsorak;
USE todo_tsorak;
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    name VARCHAR(64) NOT NULL
);
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(256) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS friends (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user INT NOT NULL,
    friend INT NOT NULL,
    status CHAR(16) NOT NULL DEFAULT "pending",
    CONSTRAINT unique_friends UNIQUE (user, friend),
    FOREIGN KEY (user) REFERENCES users(id),
    FOREIGN KEY (friend) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    content TEXT NOT NULL,
    done INT NOT NULL DEFAULT 0,
    CONSTRAINT chk_done_is_bool CHECK (done IN (0, 1)),
    FOREIGN KEY (owner) REFERENCES users(id)
);
