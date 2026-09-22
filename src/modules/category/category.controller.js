const autoBind = require("auto-bind");
const { default: status } = require("http-status");
const categoryService = require("./category.service");
const { categoryMessages } = require("./category.message");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }
  async create(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;
      await this.#service.create({ name, slug, icon, parent });
      return res.status(status.CREATED).json({
        message: categoryMessages.create,
      });
    } catch (error) {
      next(error);
    }
    
  }
  async find(req, res, next) {
    try {
      const categorys = await this.#service.find();
      return res.json(categorys);
    } catch (error) {
      next(error);
    }
  }
    async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      res.status(status.OK).json({
        message: categoryMessages.remove,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
