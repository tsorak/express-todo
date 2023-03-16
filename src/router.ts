import express, { Router } from "express";

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

router.post("/api/login", express.json(), loginController);

router.post("/api/register", express.json(), registerController);

//friends
router.get("/friends", (req, res) => res.redirect("/?page=friends"));

router.get("/api/friends", verifySession, getFriendsController);

router.post("/api/friends", express.json(), verifySession, addFriendController);

router.patch("/api/friends", express.json(), verifySession, acceptFriendController);

router.delete("/api/friends", express.json(), verifySession, removeFriendController);

//todos
router.get("/todos", (req, res) => res.redirect("/?page=todos"));

router.post("/api/todos", express.json(), (req, res) => {});

router.patch("/api/todos", express.json(), (req, res) => {});

router.delete("/api/todos", express.json(), (req, res) => {});

export default router;
