const { Router } = require("express");
const userController = require("./user.controller");
const Authorization = require("./../../guard/authorization.guard");

const router = Router();

router.get("/whoami", Authorization, userController.whoami);

module.exports = {
  UserRouter: router,
};
