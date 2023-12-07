const express = require("express");
const router = express.Router();
const { register, activateAccount, login, auth,findUser, sendResetPasswordCode } = require("../controllers/user");
const { authUser } = require("../middleware/auth");

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);

module.exports = router;
