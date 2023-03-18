import express, { Router } from "express";

import validate from "./validation";
import { verifySession } from "./session";

import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";

import getFriendsController from "./controllers/friends/getFriendsController";
import addFriendController from "./controllers/friends/addFriendController";
import acceptFriendController from "./controllers/friends/acceptFriendController";
import removeFriendController from "./controllers/friends/removeFriendController";

import getTodoListsController from "./controllers/todos/getTodoListsController";
import addListController from "./controllers/todos/addListController";
import addTodoController from "./controllers/todos/addTodoController";
import toggleTodoController from "./controllers/todos/toggleTodoController";
import removeTodoController from "./controllers/todos/removeTodoController";

const router = Router();

//auth
router.get("/auth", (req, res) => res.redirect("/?page=auth"));

router.post("/api/login", express.json(), validate.auth.login, loginController);

router.post("/api/register", express.json(), validate.auth.register, registerController);

//friends
router.get("/friends", (req, res) => res.redirect("/?page=friends"));

router.get("/api/friends", validate.friends.get, verifySession, getFriendsController);

router.post("/api/friends", express.json(), validate.friends.add, verifySession, addFriendController);

router.patch("/api/friends", express.json(), validate.friends.accept, verifySession, acceptFriendController);

router.delete("/api/friends", express.json(), validate.friends.remove, verifySession, removeFriendController);

//todos
router.get("/todos", (req, res) => res.redirect("/?page=todos"));

router.get("/api/todolists", validate.todos.get, verifySession, getTodoListsController);

router.post("/api/todolists", express.json(), validate.todos.addList, verifySession, addListController);

router.post("/api/todos", express.json(), validate.todos.addTodo, verifySession, addTodoController);

router.patch("/api/todos", express.json(), validate.todos.toggleTodo, verifySession, toggleTodoController);

router.delete("/api/todos", express.json(), validate.todos.removeTodo, verifySession, removeTodoController);

export default router;
