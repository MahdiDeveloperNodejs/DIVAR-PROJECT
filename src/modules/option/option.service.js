const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");
const { optionMessages } = require("./option.message");
const OptionModel = require("./option.model");
const autoBind = require("auto-bind");
const CategoryModel = require("../category/category.model");

class optionService {
  #model;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryModel = CategoryModel;
  }
  async find() {
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }
  async create(optionDto) {
    const category = await this.checkExisById(optionDto.category);
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    await this.AllredycheckExisBykey(optionDto.key, category._id);
    if (optionDto?.list && typeof optionDto.list === "string") {
      optionDto.list = optionDto.list.split(",");
    } else if (Array.isArray(optionDto.list)) optionDto.list = [];
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
  async checkExisById(id) {
    const category = await this.#categoryModel.findById(id);
    if (!category) throw new createHttpError.NotFound(optionMessages.NotFound);
    return category;
  }
  async AllredycheckExisBykey(key, category) {
    const exSest = await this.#categoryModel.findOne({ key, category });
    if (exSest)
      throw new createHttpError.Conflict(optionMessages.AllredyExiset);
    return exSest;
  }
  async checkExisByCategoryID(id) {
    const category = await this.#model.findById(id);
    if (!category) throw new createHttpError.NotFound(optionMessages.NotFound);
    return category;
  }
}

module.exports = new optionService();
