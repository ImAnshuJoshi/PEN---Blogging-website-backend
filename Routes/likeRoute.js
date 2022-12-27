import express from "express";
import { likeBlog } from "../Controllers/likeController.js";
import auth from "../Middlewares/tokenauth.js";

const router = express.Router();

router.post("/", auth, likeBlog);

export default router;
