const Book = require("../models/bookModel");
const Poem = require("../models/poemModel");

exports.display = async(req, res) => {
    const bookResult = await Book.find({}).count();
    const poemResult = await Poem.find({}).count();
    res.render("Dashboard", { user: req.user, book: bookResult, poem: poemResult });
}