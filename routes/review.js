const express = require('express');
const router = express.Router({ mergeParams: true });
const review = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview));

router.delete(
    '/:reviewId',
    isLoggedIn,
    isReviewAuthor,
    catchAsync(review.deleteReview)
);

module.exports = router;
