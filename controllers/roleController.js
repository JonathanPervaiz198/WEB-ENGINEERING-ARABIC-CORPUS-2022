const Users = require("../models/User.js");

exports.show = async (req,res) => {
    const result = Users.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('manageRoles',{user: req.user , records: data})     
    })
}

exports.showforManaging = async (req,res) => {
    const result = Users.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('manageRoles',{user: req.user , records: data})
 
    })
}