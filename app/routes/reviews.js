const express = require('express');
const router = express.Router();
const model = require('../db/models');
const RouteUtil = require('../helpers/route-util');
const {body, validationResult} = require('express-validator/check');
const jwtMiddleware = require('express-jwt');
const JwtUtil = require('../helpers/jwt-util');

router.post('/:id', jwtMiddleware({secret: JwtUtil.JWT_SECRET}), [
  body('comment').isLength({max: 500}).not().isEmpty(),
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError('Invalid parameters to add review.',
      422, errors.mapped()));
  }

  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User dot not have right access', 401));
  }

  const userRev = await model.User.findById(req.params.id);
  if (userRev === null) {
    return next(RouteUtil.createError('User does not exist', 404));
  }

  const arts = await user.getSoldArticle({
    where: {ownerId: userRev.id},
  });
  if (arts.length === 0) {
    return next(RouteUtil.createError(
      'You did not bought article from this user', 401
    ));
  }

  try {
    user.addReviewGiven(userRev, {through: {comment: req.body.comment}})
      .then((review) => {
        res.status(200).json({message: 'review added to user'});
      });
  } catch (e) {
    next(RouteUtil.createError('Adding review to user failed', 500));
  }
});

router.get('/:id/received', async function(req, res, next) {
  const userRev = await model.User.findById(req.params.id);
  if (userRev === null) {
    return next(RouteUtil.createError('User not found', 404));
  }

  userRev.getReviewReceived( {
    attributes: {exclude: ['password', 'email', 'address']},
  }).then((reviews) => res.status(200).json(reviews));
});
module.exports = router;
