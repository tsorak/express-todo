import express, { Router } from "express";

import validate from "./validation";
import { verifySession } from "./session";

import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";

import getFriendsController from "./controllers/friends/getFriendsController";
import addFriendController from "./controllers/friends/addFriendController";
import acceptFriendController from "./controllers/friends/acceptFriendController";
import removeFriendController from "./controllers/friends/removeFriendController";

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

router.get("/api/todolists", validate.todos.get, verifySession, (req, res) => {});

router.post("/api/todolists", express.json(), validate.todos.addList, verifySession, (req, res) => {});

router.post("/api/todos", express.json(), validate.todos.addTodo, verifySession, (req, res) => {});

router.patch("/api/todos", express.json(), validate.todos.toggleTodo, verifySession, (req, res) => {});

router.delete("/api/todos", express.json(), validate.todos.removeTodo, verifySession, (req, res) => {});

export default router;
