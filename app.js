if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressErrors');
const ejsMate = require('ejs-mate');
const path = require('path');
const app = express();
const campgrounds = require('./routes/campground.js');
const reviews = require('./routes/review.js');
const userRoute = require('./routes/users.js');
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const User = require('./models/user');
const MongoStore = require('connect-mongo');
const dbURL = 'mongodb://localhost:27017/yelpCamp';

main().catch((err) => {
    console.log('Oh no ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect(dbURL);
    console.log('connected to mongoose');
}

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const store = MongoStore.create({
    mongoUrl: dbURL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisisasecret',
    },
});

store.on('error', function (e) {
    console.log('Session Store Error', e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', userRoute);
app.use('/campground', campgrounds);
app.use('/campground/:id/reviews', reviews);

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    throw new ExpressError('Page Not Found', 404);
});

app.use((err, req, res, next) => {
    // const { statusCode = 500 } = err;
    // if (!err.message) err.message = 'Oh No, something went wrong!!!';
    // res.status(statusCode).render('error', { err });
    res.send('Error');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
