const autoBind = require("auto-bind");
const categoryController = require("./category.controller");
const CategoryModel = require("./category.model");
const { default: slugify } = require("slugify");
const createHttpError = require("http-errors");
const { categoryMessages } = require("./category.message");
const { isValidObjectId, Types } = require("mongoose");
const OptionModel = require("../option/option.model");

class CategoryService {
  #optionModel;
  #model;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
    this.#optionModel = OptionModel;
  }
  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExisById(categoryDto.parent);
      categoryDto.parent = existCategory._id;
      categoryDto.parents = [
        ...new Set(
          [existCategory._id.toString()]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id)),
        ),
      ];
    }
    if (categoryDto?.slug) {
      categoryDto.slug = slugify(categoryDto.slug);
      await this.alreadyExisBySlug(categoryDto.slug);
    } else {
      categoryDto.slug = slugify(categoryDto.name);
    }

    const category = await this.#model.create(categoryDto);
    return category;
  }
  async find() {
    return await this.#model.find({ parent: { $exists: false } });
  }
  async checkExisById(id) {
    const category = await this.#model.findById(id);
    if (!category)
      throw new createHttpError.NotFound(categoryMessages.NotFound);
    return category;
  }
  async checkExisBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (!category)
      throw new createHttpError.Conflict(categoryMessages.NotFound);
    return category;
  }
  async alreadyExisBySlug(slug) {
    const category = await this.#model.findOne({ slug });
    if (category)
      throw new createHttpError.Conflict(categoryMessages.AllredyExiset);
    return null;
  }
  async remove(id) {
    await this.checkExisById(id);
    await this.#optionModel.deleteMany({ category: id }).then(async () => {
      return await this.#model.deleteOne({ _id: id });
    });
    return true;
  }
}

module.exports = new CategoryService();
