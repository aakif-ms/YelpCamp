const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const user = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router
    .route('/register')
    .get((req, res) => {
        res.render('users/register');
    })
    .post(catchAsync(user.registerUser));

router
    .route('/login')
    .get(user.renderLoginUser)
    .post(
        storeReturnTo,
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login',
        }),
        user.loginUser
    );

router.get('/logout', user.logoutUser);

module.exports = router;
