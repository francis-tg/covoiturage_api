
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    tel: {type:String,required:true,unique:true},
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStore:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);