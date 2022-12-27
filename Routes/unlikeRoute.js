import express from "express";
import { unlikeBlog } from "../Controllers/unlikeController.js";
import auth from "../Middlewares/tokenauth.js";

const router = express.Router();

router.post("/", auth, unlikeBlog);

export default router;
