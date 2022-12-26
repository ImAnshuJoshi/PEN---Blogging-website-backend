import express from "express";
import { likeBlog } from "../Controllers/likeController.js";

const router = express.Router();

router.post("/", likeBlog);

export default router;
