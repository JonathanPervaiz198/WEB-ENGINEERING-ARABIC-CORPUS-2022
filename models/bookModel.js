const mongoose = require("mongoose");
const { text } = require("pdfkit");
const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    publishDate: { type: Date, required: true },
    isbn: { type: Number, required: true },
    pageCount: { type: Number, required: true },
    wordCount: { type: Number, required: true },
    rating: { type: Number, required: true },
    bookData: { type: String,required: true}
  }
);

// Export the model
module.exports = mongoose.model("book", BookSchema);