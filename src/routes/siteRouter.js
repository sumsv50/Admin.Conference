const express = require('express')
const passport = require('../passport');
const router = express.Router()

//Controller
const siteController = require('../controllers/siteController');

// [GET] /
router.get('/', siteController.index);

// [GET]/ Login
router.get('/login', siteController.login);

// [POST]/ Login
router.post('/login',  passport.authenticate('local', { successRedirect: '/',
                                                        failureRedirect: '/login',
                                                        failureFlash: true }));

// [GET]/ Logout
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

// [GET] /forgot-password
router.get('/forgot-password', siteController.resetPassword);

// [POST] /forgot-password
router.post('/forgot-password', siteController.forgotPassword);

// [GET] /reset/:token/:id
router.get('/reset/:token/:id', siteController.reset);

// [POST] /reset/:token/:id
router.post('/reset/:token/:id', siteController.changePassword);


module.exports = router;