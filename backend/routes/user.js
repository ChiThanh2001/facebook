const express = require("express");
const router = express.Router();
const { register, activateAccount, login, auth } = require("../controllers/user");
const { authUser } = require("../middleware/auth");

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);

module.exports = router;
