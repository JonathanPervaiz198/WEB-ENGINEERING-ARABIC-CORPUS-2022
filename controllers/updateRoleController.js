var path = require('path')
const User = require("../models/User");


exports.show = async (req,res) => {
    let student = await User.findOne({ _id: req.params.id });
    res.render("updateRole", {
      user: student
    });
}

exports.update = async (req,res) => {
  await User.findByIdAndUpdate({_id: req.params.id},{ $set: {role:req.body.role}})
      console.log(req.body.role)
      console.log(req.params.id)
      res.redirect('/users/manageRoles')
        
    }
    


