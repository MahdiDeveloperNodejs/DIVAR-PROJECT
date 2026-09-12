const { default: mongoose, Types, model } = require("mongoose");

const OptionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, enum: ["number", "string", "array", "boolean"] },
  enum: { type: Array, default: [] },
  guid: { type: String, default: false },
  category: { type: Types.ObjectId, ref: "Category", required: true },
});

const OptionModel = model("option", OptionSchema);
module.exports = OptionModel;
