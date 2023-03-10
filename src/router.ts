import express, { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

//auth
router.get("/auth", (req, res) => {});

router.post("/api/login", express.json(), (req, res) => {});

router.post("/api/register", express.json(), (req, res) => {});

//friends
router.get("/friends", (req, res) => {});

router.get("/api/friends", express.json(), (req, res) => {});

router.post("/api/friends", express.json(), (req, res) => {});

router.delete("/api/friends", express.json(), (req, res) => {});

//todos
router.get("/todos", (req, res) => {});

router.post("/api/todos", express.json(), (req, res) => {});

router.patch("/api/todos", express.json(), (req, res) => {});

router.delete("/api/todos", express.json(), (req, res) => {});

export default router;