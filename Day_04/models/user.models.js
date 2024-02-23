const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
      type:String,
      required:true,
      enum:["customer","seller","marketer"]
    }
  },
  { versionKey: false }
);


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
