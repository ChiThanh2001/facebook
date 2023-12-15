const express = require("express");
const { createPost, getAllPosts, comment, getCommentByPost } = require("../controllers/post");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);
router.put("/comment", authUser, comment);
router.get("/getCommentsByPost/:postId", getCommentByPost);

module.exports = router;
