const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    Author: { type: String, required: true },
    title: { type: String, required: true },
    blogtext: { type: String, required: true },
  },
  { timestamps: true }
);

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
