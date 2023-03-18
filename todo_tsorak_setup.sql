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
CREATE TABLE IF NOT EXISTS todo_lists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    FOREIGN KEY (owner) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    list_id INT NOT NULL,
    content VARCHAR(128) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (list_id) REFERENCES todo_lists(id)
);
DELIMITER $$
CREATE PROCEDURE get_friends(IN user_id INT)
BEGIN
    SELECT u.id, u.name, f.status, (f.user = user_id) as isInitiator FROM users u
    INNER JOIN friends f
    ON (f.user = user_id AND f.friend = u.id)
    OR (f.user = u.id AND f.friend = user_id);
END$$
DELIMITER ;
