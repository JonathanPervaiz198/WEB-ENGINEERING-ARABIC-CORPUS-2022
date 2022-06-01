const Poems = require("../models/poemModel");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };

exports.show = async (req,res) => {
    const result = Poems.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('viewPoems',{user: req.user , records: data})     
    })
}

exports.showReport = async (req,res) => {
    const result = Poems.find({})
    const user = {name: 'Poems',
                  link: '/users/poems/generatepdf'}
    await result.exec(function(err,data){
        if(err) throw err
        res.render('reportTemplate',{ records: data, user})
    }) 
    
}

exports.showforManaging = async (req,res) => {
    const result = Poems.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('managePoems',{user: req.user , records: data})
 
    })
}

exports.allReport = (req, res) => {
    const user = {name: 'Poems',
    link: '/users/poems/generatepdf'}
    Poems.find(function(err, poems) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont find books." });
        }
        res.status(200).render(
            "reportTemplate", {records: poems,user},
            function(err, html) {
                pdf
                    .create(html, options)
                    .toFile("uploads/poems.pdf", function(err, result) {
                        if (err) return console.log(err);
                        else {
                            var datafile = fs.readFileSync("uploads/poems.pdf");
                            console.log(datafile);
                            res.header("content-type", "application/pdf");
                            res.send(datafile);
                        }
                    });
            }
        );
    });
};