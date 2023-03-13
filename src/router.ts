import express, { Router } from "express";

import loginController from "./controllers/loginController";
import registerController from "./controllers/registerController";

const router = Router();

//auth
router.get("/auth", (req, res) => res.redirect("/?page=auth"));

router.post("/api/login", express.json(), loginController);

router.post("/api/register", express.json(), registerController);

//friends
router.get("/friends", (req, res) => res.redirect("/?page=friends"));

router.get("/api/friends", express.json(), (req, res) => {});

router.post("/api/friends", express.json(), (req, res) => {});

router.delete("/api/friends", express.json(), (req, res) => {});

//todos
router.get("/todos", (req, res) => res.redirect("/?page=todos"));

router.post("/api/todos", express.json(), (req, res) => {});

router.patch("/api/todos", express.json(), (req, res) => {});

router.delete("/api/todos", express.json(), (req, res) => {});

export default router;
