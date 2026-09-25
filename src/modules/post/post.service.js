const autoBind = require("auto-bind");
const OptionModel = require("../option/option.model");
const PostModel = require("./post.model");

class PostService {
  #optionModel;
  #model;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }
}

module.exports = new PostService();
