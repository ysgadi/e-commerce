const express = require('express');
const router = express.Router();
const model = require('../db/models');
const RouteUtil = require('../helpers/route-util');
const jwtMiddleware = require('express-jwt');
const JwtUtil = require('../helpers/jwt-util');
const {body, validationResult} = require('express-validator/check');

router.put('/', [
  body('email').isLength({max: 255}).isEmail().not().isEmpty(),
  body('pseudo').isLength({max: 255}).not().isEmpty(),
  body('firstname').isLength({max: 255}),
  body('lastname').isLength({max: 255}),
  body('address').isLength({max: 255}).not().isEmpty(),
  body('IBAN').isLength({max: 255}).not().isEmpty(),
],
async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(RouteUtil.createError('Invalid parameters to create user.',
      422, errors.mapped()));
  }

  const user = await model.User.findById(req.user.data.id);
  if (user === null) {
    return next(RouteUtil.createError('User not found', 404));
  }

  try {
    user.update({
      email: req.body.email,
      pseudo: req.body.pseudo,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      address: req.body.address,
      IBAN: req.body.IBAN,
    }).then((data) => {
      const u = data.toJSON();
      delete u.password;
      res.status(200).json({
        token: JwtUtil.createToken({data: u}, {expiresIn: '30d'}),
      });
    }).catch(model.sequelize.UniqueConstraintError, () => {
      next(RouteUtil.createError('user email exists', 401));
    });
  } catch (e) {
    next(RouteUtil.createError('Registration error', 500));
  }
});

router.delete('/', jwtMiddleware({secret: JwtUtil.JWT_SECRET}),
  async function(req, res, next) {
    const user = await model.User.findById(req.user.data.id);
    if (user === null) {
      return next(RouteUtil.createError('User dot not have right access', 401));
    }

    try {
      const articles = await user.getSellArticles();
      for (let i=0; i<articles.length; i++) {
        articles[i].destroy();
      }
      user.destroy();
      res.status(200).json({message: 'account deleted'});
    } catch (e) {
      next(RouteUtil.createError('Deleting account error', 500));
    }
  });

module.exports = router;
