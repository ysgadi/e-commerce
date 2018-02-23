const express = require('express');
const router = express.Router();
const model = require('../db/models');
const HashUtil = require('../helpers/hash-util');
const RouteUtil = require('../helpers/route-util');
const JwtUtil = require('../helpers/jwt-util');
const {body, validationResult} = require('express-validator/check');

router.post('/', [
  body('email').isLength({max: 255}).isEmail().not().isEmpty(),
  body('password').isLength({min: 5, max: 32}).not().isEmpty(),
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError('Invalid parameters to login',
      422, errors.mapped()));
  }

  try {
    const user = await model.User.findOne({
      where: {email: req.body.email},
    });

    const password = user === null
      ? false
      : await HashUtil.comparePassword(req.body.password, user.password);

    if (user !== null && password === true) {
      const u = user.toJSON();
      delete u.password;
      res.status(200).json({
        token: JwtUtil.createToken({data: u}, {expiresIn: '30d'}),
      });
    } else {
      next(RouteUtil.createError('Invalid login', 401));
    }
  } catch (e) {
    next(RouteUtil.createError('Login error', 500));
  }
});

module.exports = router;
