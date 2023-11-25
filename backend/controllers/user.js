const { sendVerificationEmail } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "The email address is already exist",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters",
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters",
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "password must be atleast 6 characters",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const username = first_name + " " + last_name;

    const user = await new User({
      first_name,
      last_name,
      email,
      username,
      password: hashPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    console.log(emailVerificationToken);
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      userName: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const userDecode = jwt.verify(token, process.env.TOKEN_SECRET);
  const userIsExist = await User.findById(userDecode.id);
  if (userIsExist.verified) {
    res.status(400).json({
      message: "this account is already active",
    });
  } else {
    await User.findByIdAndUpdate(userDecode.id, { verified: true });
    res.status(200).json({
      message: "Activate account successfully",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "This account is not exist",
      });
    }
  
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "The credential you provided is wrong",
      });
    }
    if (!user.verified) {
      return res.status(400).json({
        message: "This account is not activate yet!",
      });
    }
    const token = generateToken({id: user._id.toString()}, '7d')
    return res.send({
      id: user._id,
      username:user.username,
      picture:user.picture,
      first_name:user.first_name,
      last_name:user.last_name,
      token,
      verified:user.verified,
      message:"Login successfully"
    });
  } catch (error) {
    console.log(error)
  }
};
