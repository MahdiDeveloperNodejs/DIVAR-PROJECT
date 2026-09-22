const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");
const { optionMessages } = require("./option.message");
const OptionModel = require("./option.model");
const autoBind = require("auto-bind");
const categoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/function");
const { default: mongoose } = require("mongoose");

class optionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = categoryService;
  }
  async find() {
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }
  async create(optionDto) {
    const category = await this.#categoryService.checkExisById(
      optionDto.category,
    );
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });

    await this.AllredycheckExisBykey(optionDto.key, category._id);
    if (optionDto?.list && typeof optionDto.list === "string") {
      optionDto.list = optionDto.list.split(",");
    } else if (!Array.isArray(optionDto.list)) optionDto.list = [];
    if (isTrue(optionDto?.required)) optionDto.required = true;
    if (isFalse(optionDto?.required)) optionDto.required = false;

    const option = await this.#model.create(optionDto);
    return option;
  }
  async findByCategoryId(category) {
    await this.checkExisByCategoryID(category);
    const options = await this.#model.populate([
      { path: "category", select: { name: 1, slug: 1 } },
    ]);
    return options;
  }
  async findBySlug(slug) {
    const option = await this.#model.aggregate([
      {
        $lookup: {
          from: "categorys",
          localField: "_id",
          foreignField: "category",
          as: "category",
        },
      },
    ]);
    return option;
  }
  async findById(id) {
    return await this.checkExisById(id);
  }
  async removeById(id) {
    const option = await this.checkExisById(id);
    return await this.#model.deleteOne(option._id);
  }
  async checkExisById(id) {
    const option = await this.#model.findById(id);
    if (!option) throw new createHttpError.NotFound(optionMessages.NotFound);
    return option;
  }
  async AllredycheckExisBykey(key, category) {
    const exSest = await this.#model.findOne({ key, category });
    if (exSest)
      throw new createHttpError.Conflict(optionMessages.AllredyExiset);
    return exSest;
  }
  async checkExisByCategoryID(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(optionMessages.NotFound);
    return category;
  }
  async update(id, optionDto) {
    const exist = await this.checkExisById(id);
    if (optionDto?.category && mongoose.isValidObjectId(optionDto?.category)) {
      const category = await this.#categoryService.checkExisById(
        optionDto.category,
      );
      optionDto.category = category._id;
    } else {
      delete optionDto.category;
    }
    if (optionDto.slug) {
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: "_",
        lower: true,
      });
      let categoryId = exist.category;
      if (optionDto.category) categoryId = optionDto.category;
      await this.AllredycheckExisBykey(optionDto.key, categoryId);
    }

    if (optionDto?.list && typeof optionDto.list === "string") {
      optionDto.list = optionDto.list.split(",");
    } else if (Array.isArray(optionDto.list)) delete optionDto.list;
    if (isTrue(optionDto?.required)) optionDto.required = true;
    else if (isFalse(optionDto?.required)) optionDto.required = false;
    else delete optionDto.required
    return await this.#model.updateOne({ _id: id }, { $set: optionDto });
  }
}

module.exports = new optionService();
