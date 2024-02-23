const bcrypt = require("bcrypt");
const UserModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blacklist.models");

const registerUser = async (req, res) => {
  try {
    const { username, email, password ,role } = req.body;

    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send({ status: "fail", msg: "You need to password" });
      } else {
        const user = new UserModel({
          username,
          email,
          password: hash,
          role
        });
        await user.save();
        res.status(200).send({
          status: "success",
          msg: "User has been created successfully",
        });
      }
    });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUserWithMail = await UserModel.findOne({ email });

    bcrypt.compare(password, findUserWithMail.password, (err, result) => {
      if (err) {
        res
          .status(400)
          .send({ status: "fail", msg: "Your password is incorrect" });
      } else {

        const access_token = jwt.sign({userId:findUserWithMail._id,userEmail:findUserWithMail.email},"vijendra",{expiresIn:"1d"})
        const refresh_token = jwt.sign({userId:findUserWithMail._id,userEmail:findUserWithMail.email},"vijendrachouhan",{expiresIn:"1d"})
        res.cookie("access_token", access_token);
        res.cookie("refresh_token", refresh_token);

        res.status(200).send({
          status: "success",
          msg: "User login successfully",
        });
      }
    });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const access_token = req.cookies["access_token"];
    const findToken = await BlacklistModel.findOne({ access_token });

    if (findToken) {
      return res
        .status(401)
        .send({ status: "all ready", msg: "You are already logged out" });
    }

    const blackListToken = new BlacklistModel({ access_token });
    await blackListToken.save();
    res
      .status(200)
      .send({ status: "success", msg: "User logged out successfully" });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

module.exports ={loginUser,registerUser,logoutUser}