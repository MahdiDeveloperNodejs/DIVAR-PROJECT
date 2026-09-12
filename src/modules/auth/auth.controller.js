const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMasseges } = require("./auth.message");
const { status } = require("http-status");
const NodeEnv = require("../../common/constant/env.enum");
const CookieName = require("../../common/constant/cookie.enum");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.status(status.CREATED).json({
        massege: AuthMasseges.SendOtpSaccefully,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const Token = await this.#service.checkOTP(mobile, code);
      res
        .cookie(CookieName.AccessToken, Token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production,
        })
        .status(status.CREATED)
        .json({
          massege: AuthMasseges.LoginSuccessfuly,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res
        .clearCookie(CookieName.AccessToken)
        .status(status.CREATED)
        .json({
          massege: AuthMasseges.Logout,
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
