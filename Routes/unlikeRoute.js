import express from "express";
import { unlikeBlog } from "../Controllers/unlikeController.js";

const router = express.Router();

router.post("/", unlikeBlog);

export default router;
