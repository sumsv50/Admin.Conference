const passport = require('passport');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const adminAccountService = require('../models/modelServices/adminAccountService');
const resetPasswordService = require('../models/modelServices/resetPasswordService');
const { hideEmail } = require('../util/functions.js');
const mail = require('../config/Mail/index.js');


const saltRounds = 10;

class SiteController{
    //[GET] /
    index(req, res){
        res.redirect('/products');
    }

    //[GET] /login
    login(req, res){
        if(req.user && req.user.status == "ACTIVE") {
            res.redirect('/products');
        } else {
            res.render('login', { message: req.flash('error') });
        }
    }

    // [GET] /forgot-password
    resetPassword(req, res){
       res.render('accounts/forgotPassword');
    }

     // [POST] /forgot-password
     async forgotPassword(req, res, next){
        try {
            const username = req.body.username;
         
            const admin = await adminAccountService.getAdminByUsername(username);
            
            if(!admin) {
                var message = 'Do not found your account!';
                res.render('forgotPassword', {message})
                return;
            }

            var email = admin.email;

            if(!email) {
                var message = 'Your account not has email!';
                res.render('forgotPassword', {message})
                return;
            }

            var token = crypto.randomBytes(32).toString('hex');

            var hash = await bcrypt.hash(token, saltRounds);

            //Delete old entry2=
            await resetPasswordService.deleteOne(admin._id);

            //Store resetPassword
            resetPasswordService.store(hash, admin._id);

            var pEmail = hideEmail(email);

            var mailOptions = {
                from: '"SBookshop 📚" <sbookshop.noreply@gmail.com>',
                to: email,
                subject: 'Reset your password link',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '/'+ admin._id + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            await mail.sendMail(mailOptions);
            res.render('accounts/announcement-link', {pEmail});
            
        } catch(err) { next(err) };
    }

    // [GET] /reset/:token/:id
    async reset(req, res) {
        try {
            const token = req.params.token;
            const admin_id = req.params.id;
            const resetPassword = await resetPasswordService.findOne(admin_id);
            
            if(!resetPassword) {
                res.render('login', { message: 'Password reset token is invalid or has expired.'});
            } else {
                const isMatch = await bcrypt.compare(token, resetPassword.token);
                if(!isMatch) {
                    res.render('login', { message: 'Password reset token is invalid or has expired.'});
                    return;
                };
                //Do:
                
                res.render('accounts/input-new-password', {token, admin_id});
            }
        } catch(err) { next(err) };
    }

    // [POST] /reset/:token/:id
    async changePassword(req, res) {
        try {
            const token = req.params.token;
            const admin_id = req.params.id;
            const password = req.body.password;
            const confirm_password = req.body.confirm_password;
          
            if(confirm_password != password) {
                res.render('accounts/input-new-password', { message: 'Error System'});
                return;
            }
            const resetPassword = await resetPasswordService.findOne(admin_id);
            
            if(!resetPassword) {
                res.render('login', { message: 'Password reset token is invalid or has expired.'});
            } else {
                const isMatch = await bcrypt.compare(token, resetPassword.token);
                if(!isMatch) {
                    res.render('login', { message: 'Password reset token is invalid or has expired.'});
                    return;
                };
                
                //Do:
                await adminAccountService.updatePassword(admin_id, password);
                res.render('login', {smessage: "Update password successful!"});
                resetPasswordService.deleteOne(admin_id);
            }
        } catch(err) { next(err) };
    }
}

module.exports = new SiteController;