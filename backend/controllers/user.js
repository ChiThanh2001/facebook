const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
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
    const username = first_name + " " + last_name
    console.log(password)
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
    const test = generateToken({email},"30m")

    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.json({ message: error });
  }
};
