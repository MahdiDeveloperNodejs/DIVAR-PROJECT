const { Schema, model, default: mongoose } = require("mongoose");

const OTPSchema = new mongoose.Schema({
  code: { type: String, required: false, default: undefined },
  expiesIn: { type: Number, required: false, default: 0 },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, unique: true, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: { type: String, required: true, default: false },
    accessTocken: { type: String },
  },
  { timestamps: true },
);

const UserModel = model("user", userSchema);
module.exports = UserModel;
