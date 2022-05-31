const User = require("../models/userModel");

exports.show = async(req, res) => {
    const result = User.find({})
    await result.exec(function(err, data) {
        if (err) throw err
        res.render('RegisteredUsers', { user: req.user, records: data })
    })
}

exports.showforManaging = async(req, res) => {
    const result = User.find({})
    await result.exec(function(err, data) {
        if (err) throw err
        res.render('manageUsers', { user: req.user, records: data })
    })
}