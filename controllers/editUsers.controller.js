const User = require("../models/userModel");


exports.display = async(req, res) => {
    const result = await User.findOne({ _id: req.params.id });
    res.render("viewRegisteredUser", { user: req.user, result });
}

exports.delete = async(req, res) => {
    const result = User.findByIdAndDelete({ _id: req.params.id });
    result.exec();
    res.redirect("/users/manageUsers");
}

exports.updateView = async(req, res) => {

    const result = await User.findOne({ _id: req.params.id });
    res.render("updateRegisteredUser", { user: req.user, result });
}

exports.update = async(req, res) => {

    const result = User.findByIdAndUpdate(req.body.id, {
        $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            phonenumber: req.body.phonenumber,
            dob: req.body.dob,
            email: req.body.email,
            registrationDate: req.body.registrationDate
        }
    });

    await result.exec(function(err, data) {
        if (err) throw err
        res.redirect("/users/manageUsers");
    })
}