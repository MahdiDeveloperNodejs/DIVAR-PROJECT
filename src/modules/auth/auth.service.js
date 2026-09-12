const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { AuthMasseges } = require("./auth.message");
const { randomInt } = require("crypto");
const jwt = require("jsonwebtoken");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }

  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });
    const now = new Date().getTime();
    console.log(now);
    const otp = {
      code: randomInt(10000, 99999),
      expiesIn: now + 1000 * 60 * 2,
    };
    if (!user) {
      const newUser = await this.#model.create({ mobile, otp });
      return newUser;
    }
    if (user.otp && user.otp.expiesIn > now) {
      throw new createHttpError.BadRequest(AuthMasseges.OtpCodeNotExpired);
    }
    user.otp = otp;
    await user.save();
    return user;
  }
  async checkOTP(mobile, code) {
    const user = await this.checkExistByMobile(mobile);
    const now = new Date().getTime();
    console.log(now);
    if (user?.otp?.expiesIn < now)
      throw new createHttpError.Unauthorized(AuthMasseges.OtpCodeNotExpired);
    if (user?.otp?.code !== code)
      throw new createHttpError.Unauthorized(AuthMasseges.OtpCodeExpired);
    if (user.verifiedMobile) {
      user.verifiedMobile = true;
    }
    const accessTocken = this.singToken({ mobile, id: user._id });
    user.accessTocken = accessTocken
    await user.save();
    return accessTocken
  }

  async logout() {}

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMasseges.NotFound);
    return user;
  }

  singToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KAY, { expiresIn: "1y" });
  }
}
module.exports = new AuthService();
