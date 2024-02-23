const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../models/user.models");
dotenv.config();

const auth = async (req, res, next) => {
  const access_token = req.cookies["access_token"];
  const refresh_token = req.cookies["refresh_token"];
  console.log(req.body, "vv");
  console.log(req.cookies);

  try {
    console.log("try two");
    jwt.verify(access_token, "vijendra", async (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          jwt.verify(
            refresh_token,
            "vijendrachouhan",
            async (err, refreshDecoded) => {
              if (err) {
                return res.status(400).send({
                  status: "fail",
                  msg: "Refresh token is invalid or expired please login again",
                });
              } else {
                const access_token = jwt.sign(
                  {
                    userId: refreshDecoded.userId,
                    userEmail: refreshDecoded.userEmail,
                  },
                  "vijendra",
                  {
                    expiresIn: "1d",
                  }
                );

                res.cookie("access_token", access_token);
                next();
              }
            }
          );
        }
      } else {
        req.user = decoded;
        const userId = decoded.userId;
        const user = await UserModel.findOne({ _id: userId });
        const role = user?.role;
        req.role = role;
        next();
      }
    });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: "Please login again" });
  }
};

module.exports = auth;
