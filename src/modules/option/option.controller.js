const autoBind = require("auto-bind");
const { default: status } = require("http-status");
const optionService = require("./option.service");
const { optionMessages } = require("./option.message");

class optionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = optionService;
  }
  async create(req, res, next) {
    try {
      const {
        title,
        key,
        type,
        enum: list,
        guid,
        category,
        required,
      } = req.body;
      await this.#service.create({
        title,
        key,
        type,
        enum: list,
        guid,
        category,
        required,
      });
      return res.status(status.CREATED).json({
        messgas: optionMessages.create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.status(status.OK).json(options);
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const options = await this.#service.findByCategoryId(categoryId);
      return res.status(status.OK).json(options);
    } catch (error) {
      next(error);
    }
  }
  async findByslug(req, res, next) {
    try {
      const { slug } = req.params;
      const options = await this.#service.findByslug(slug);
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = await this.#service.findById(id);
      return res.status(status.CREATED).json(userId);
    } catch (error) {
      next(error);
    }
  }
  async removeById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.removeById(id);
      return res.status(status.OK).json({ message: optionMessages.Delete });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const {
        title,
        key,
        type,
        enum: list,
        guid,
        category,
        required,
      } = req.body;
      const { id } = req.params;
      await this.#service.update(id, {
        title,
        key,
        type,
        enum: list,
        guid,
        category,
        required,
      });
      return res.status(status.CREATED).json({
        message: optionMessages.updated,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new optionController();
