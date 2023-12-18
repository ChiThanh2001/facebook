const express = require("express");
const router = express.Router();
const { register, activateAccount, login, auth,findUser, sendResetPasswordCode, validateResetCode, changePassword, getProfile } = require("../controllers/user");
const { authUser } = require("../middleware/auth");

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username", getProfile);

module.exports = router;
