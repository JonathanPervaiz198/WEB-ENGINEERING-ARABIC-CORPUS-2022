const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Picture = new Schema(
  {
    image: { type: String, required: true }
  }
);

// Export the model
module.exports = mongoose.model("img", Picture);