const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
}, {
    timestamps: true
});

// Export the model
module.exports = mongoose.model("RegUser", UserSchema);