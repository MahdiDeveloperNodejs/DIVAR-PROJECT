const { Router } = require("express");
const PostController = require("./post.controller");
const postController = require("./post.controller");

const router = Router();
router.get("/create", postController.createPostPage);

module.exports = {
  PostRouter: router,
};
