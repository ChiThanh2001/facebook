const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const { generateToken } = require("../helpers/tokens");
const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const Code = require("../models/Code");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateCode } = require("../helpers/generateCode");

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
    const username = first_name.toLowerCase() + last_name.toLowerCase();

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
      picture:'../../images/default_pic.png'
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

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
  try {
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
        picture: userIsExist.picture,
        first_name: userIsExist.first_name,
        last_name: userIsExist.last_name
      });
    }
  } catch (error) {
    res.status(500).json({message: error.message})
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

exports.findUser = async (req,res)=>{
  try {
    const { email } = req.body
    const user = await User.findOne({email}).select('-password')
    if(!user){
      return res.status(400).json({
        message:'Account does not exist'
      })
    }

    return res.status(200).json({
      email: user.email,
      picture: user.picture
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

exports.sendResetPasswordCode = async (req,res)=>{
  try {
    const { email } = req.body
    const user = await User.findOne({ email }).select('-password')
    await Code.findOneAndRemove({ user: user._id})
    const code = generateCode(5)
    const savedCode = await new Code({
      code,
      user:user._id
    }).save()
    sendResetCode(user.email, user.first_name, code)
    return res.status(200).json({
      message: 'Email reset code has been sent to your email'
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

exports.validateResetCode = async (req,res)=>{
  try{
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const dbCode = await Code.findOne({ user: user._id });
    
    if(dbCode.code !== code){
      return res.status(400).json({
        message: "Verification code is wrong!"
      })
    }
    return res.status(200).json({
      message: "Verification code is ok!"
    })
  } catch(error){
    res.status(400).json({
      message:error.message
    })
  }
}

exports.changePassword = async (req,res)=>{
  const { email, password } = req.body;

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate({ email }, { password: cryptedPassword});
  return res.status(200).json({
    message: 'Password was changed successfully!'
  })
}

exports.getProfile = async (req,res)=>{
  try{
    const { username } = req.params
    const profile = await User.findOne({ username }).select("-password")
    if(!profile){
      return res.status(200).json({ ok: false })
    }
    return res.status(200).json(profile)
  }catch(error){
    res.status(400).json({
      message:error.message
    })
  }
}

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};