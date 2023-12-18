const express = require("express");
const { createPost, getAllPosts, comment, getCommentByPost, getPostComment, deletePost } = require("../controllers/post");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);
router.put("/comment", authUser, comment);
router.get("/getCommentsByPost/:postId", getCommentByPost);
router.get("/getPostComment/:postId", getPostComment);
router.delete("/deletePost/:postId", deletePost);

module.exports = router;
