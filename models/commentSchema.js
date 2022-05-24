const text = require("body-parser/lib/types/text");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
