import express from "express";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog
} from "../Controllers/postController.js";
import auth from "../Middlewares/tokenauth.js";

const router = express.Router();

router.get("/:id", auth, getBlog);
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

export default router;
