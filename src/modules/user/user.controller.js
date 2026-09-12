const autoBind = require("auto-bind");
const userService = require("./user.service");
const { default: status } = require("http-status");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }

  async whoami(req, res, next) {
    try {
      const user = req.user;
      return res.status(status.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
