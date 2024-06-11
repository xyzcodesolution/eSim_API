const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("users", userSchema);
module.exports =  userModel;
