const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var multer = require('multer')
var path = require('path')

// Load User model
const User = require('../models/User');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const user_controller = require("../controllers/registeredUser.controller");
const books_controller = require("../controllers/booksController");
const poems_controller = require("../controllers/poemsController");

const editProfile_controller = require("../controllers/editProfileController");
const editUser_controller = require("../controllers/editUsers.controller");


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/welcome', (req, res) => res.render('welcome'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get('/mainscreen', ensureAuthenticated, (req, res) => res.render('mainScreen', { user: req.user }));

router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard', { user: req.user }));


router.get('/books', ensureAuthenticated, books_controller.show);
router.get('/poems', ensureAuthenticated, poems_controller.show);

//Management
router.get('/manageBooks', ensureAuthenticated, books_controller.showforManaging);
router.get('/managePoems', ensureAuthenticated, poems_controller.showforManaging);

//Add Ons
router.get('/reports', ensureAuthenticated, (req, res) => res.render('reports', { user: req.user }));

//Users Section
/*router.get('/registeredUsers',(req,res) => res.render('registeredUsers',{user: req.user}));*/
router.get('/registeredUsers', ensureAuthenticated, user_controller.show);
router.get('/manageUsers', ensureAuthenticated, user_controller.showforManaging)
router.get('/manageUsers/view/:id', ensureAuthenticated, editUser_controller.display)
router.get('/manageUsers/delete/:id', ensureAuthenticated, editUser_controller.delete)
router.get('/manageUsers/updateView/:id', ensureAuthenticated, editUser_controller.updateView)
router.post('/manageUsers/update', ensureAuthenticated, editUser_controller.update)


router.get('/editProfileView', ensureAuthenticated, editProfile_controller.show, (req, res) => res.render('editProfile', { user: req.user }))
router.post('/editProfile', ensureAuthenticated, editProfile_controller.upload, editProfile_controller.update, editProfile_controller.show)

router.get('/editProfileView/security', (req, res) => res.render('security', { user: req.user }))

// Register
router.post('/register', (req, res) => {
    const { firstname, lastname, username, phonenumber, dob, email, password, password2, image } = req.body;
    let errors = [];

    if (!firstname || !lastname || !username || !phonenumber || !dob || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstname,
            lastname,
            username,
            phonenumber,
            dob,
            email,
            password,
            password2,
            image
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    firstname,
                    lastname,
                    username,
                    phonenumber,
                    dob,
                    email,
                    password,
                    password2,
                    image
                });
            } else {
                const newUser = new User({
                    firstname,
                    lastname,
                    username,
                    phonenumber,
                    dob,
                    email,
                    password,
                    image
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/users/mainscreen',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;