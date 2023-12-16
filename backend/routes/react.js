const express = require("express");
const { reactPost, getReacts } = require("../controllers/react");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.put('/reactPost', authUser, reactPost)
router.get('/getReacts/:postId', authUser, getReacts)

module.exports = router;
