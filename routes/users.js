const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

const user_controller = require("../controllers/registeredUser.controller");
const books_controller = require("../controllers/booksController");
const poems_controller = require("../controllers/poemsController");


// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/welcome', (req, res) => res.render('welcome'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.get('/mainscreen', ensureAuthenticated, (req, res) => res.render('mainScreen',{user: req.user}));

router.get('/dashboard',(req,res) => res.render('dashboard',{user: req.user}));


router.get('/books',books_controller.show);
router.get('/poems',poems_controller.show);

//Management
router.get('/manageBooks',books_controller.showforManaging);
router.get('/managePoems',poems_controller.showforManaging);

//Add Ons
router.get('/reports',(req,res) => res.render('reports',{user: req.user}));

//Users Section
/*router.get('/registeredUsers',(req,res) => res.render('registeredUsers',{user: req.user}));*/
router.get('/registeredUsers',user_controller.show);
router.get('/manageUsers',user_controller.showforManaging)






// Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
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
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
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