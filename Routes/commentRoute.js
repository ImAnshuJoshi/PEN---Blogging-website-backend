import express from "express";
import {
  createComment,
  getallcomments,
  getcomment,
  updatecomment,
  deleteComment,
} from "../Controllers/commentController.js";
import auth from "../Middlewares/tokenauth.js";

const router = express.Router();

router.get("/", auth, getallcomments);
router.get("/:id", auth, getcomment);
router.put("/:id", auth, updatecomment);
router.post("/", auth, createComment);
router.delete("/:id", auth, deleteComment);

export default router;
