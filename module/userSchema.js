const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true,
    // validate: {
    //   validator: (v) => {
    //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    //   },
    //   message: (props) => `${props.value} is not a valid email`,
    // },
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  mobileNumber: String,
  gender: String,
  token: String,
  photoUrl: String,
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
