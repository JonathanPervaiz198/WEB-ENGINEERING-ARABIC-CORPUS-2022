const Poems = require("../models/poemModel");

exports.show = async (req,res) => {
    const result = Poems.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('viewPoems',{user: req.user , records: data})     
    })
}

exports.showforManaging = async (req,res) => {
    const result = Poems.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('managePoems',{user: req.user , records: data})
 
    })
}