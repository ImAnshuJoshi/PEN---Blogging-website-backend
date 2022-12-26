import express from "express";
import { register, login, getuser } from "../Controllers/authController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/users/:id", getuser);

export default router;
