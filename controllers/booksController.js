const Books = require("../models/bookModel");
const pdf = require("html-pdf");
const fs = require("fs");
const options = { format: "A4" };


exports.show = async (req,res) => {
    const result = Books.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('viewBooks',{user: req.user , records: data})
    }) 
}

exports.showReport = async (req,res) => {
    const result = Books.find({})
    const user = {name: 'Books',
                  link: '/users/books/generatepdf'}
    await result.exec(function(err,data){
        if(err) throw err
        res.render('reportTemplate',{ records: data, user})
    }) 
    
}

exports.showforManaging = async (req,res) => {
    const result = Books.find({})
    await result.exec(function(err,data){
        if(err) throw err
        res.render('manageBooks',{user: req.user , records: data});
    })
    
}

exports.allReport = (req, res) => {
    const user = {name: 'Books',
                  link: '/users/books/generatepdf'}
    Books.find(function(err, books) {
        if (err) {
            return res
                .status(400)
                .json({ err: "Oops something went wrong! Cannont find books." });
        }
        res.status(200).render(
            "reportTemplate", {records: books,user},
            function(err, html) {
                pdf
                    .create(html, options)
                    .toFile("uploads/books.pdf", function(err, result) {
                        if (err) return console.log(err);
                        else {
                            var datafile = fs.readFileSync("uploads/books.pdf");
                            console.log(datafile);
                            res.header("content-type", "application/pdf");
                            res.send(datafile);
                        }
                    });
            }
        );
    });
};