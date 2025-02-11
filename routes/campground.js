const express = require('express');
const router = express.Router();
const campground = require('../controllers/campgrounds.js');
const catchAsync = require('../utils/catchAsync');
const {
    isLoggedIn,
    isAuthor,
    validateCampground,
} = require('../middleware.js');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
    .route('/')
    .get(catchAsync(campground.index))
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(campground.createCampground)
    );

router.get('/new', isLoggedIn, campground.renderNewForm);

router
    .route('/:id')
    .get(catchAsync(campground.showCampground))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campground.updateCampground)
    )
    .delete(isLoggedIn, isAuthor, catchAsync(campground.delete));

router.get(
    '/:id/edit',
    isLoggedIn,
    isAuthor,
    catchAsync(campground.editCampground)
);

module.exports = router;
