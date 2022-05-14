const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    registrationDate: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

// Export the model
module.exports = mongoose.model("RegUser", UserSchema);