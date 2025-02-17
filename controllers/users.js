const User = require('../models/user');

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp');
            res.redirect('/campground');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLoginUser = (req, res) => {
    res.render('users/login');
};

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome Back');
    const redirectUrl = res.locals.returnTo || '/campground';
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campground');
    });
};
