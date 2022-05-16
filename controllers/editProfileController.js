var multer = require('multer')
var path = require('path')
const User = require("../models/User");


exports.show = async(req, res) => {
    const result = User.findById({ _id: req.user._id })
    await result.exec(function(err, data) {
        if (err) throw err
        res.render('editProfile', { user: req.user, records: data })
    })
}


const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

exports.upload = multer({ storage: storage }).single('image')

exports.update = async(req, res) => {
    this.show

    if (req.file) {
        console.log('Added Successfully!!!')
        const result = User.findByIdAndUpdate({ _id: req.user._id }, {
            $set: {
                name: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                phonenumber: req.body.phonenumber,
                dob: req.body.dob,
                email: req.body.email,
                image: req.file.filename
            }
        })
        await result.exec(function(err, data) {
            if (err) throw err
            res.redirect('/users/editProfileView')
                //res.render('editProfile',{user: req.user , records: data})
        })
    } else {
        const result = User.findByIdAndUpdate({ _id: req.user._id }, {
            $set: {
                name: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                phonenumber: req.body.phonenumber,
                dob: req.body.dob,
                email: req.body.email
            }
        })
        await result.exec(function(err, data) {
            if (err) throw err
            res.redirect('/users/editProfileView')
                //res.render('editProfile',{user: req.user , records: data})
        })
    }


    /*var fileName = req.file.filename
    var newImage = new User({
        image: fileName
    }); 

    newImage.save(function(err, doc){
        if(err) throw err;
    })*/
}