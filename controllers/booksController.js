const Books = require("../models/bookModel");

exports.show = async (req,res) => {
    const result = Books.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('viewBooks',{user: req.user , records: data})
    }) 
}

exports.showforManaging = async (req,res) => {
    const result = Books.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('manageBooks',{user: req.user , records: data})
    })
    
}