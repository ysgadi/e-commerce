const express = require('express');
const router = express.Router();
const model = require('../db/models');
const HashUtil = require('../helpers/hash-util');
const RouteUtil = require('../helpers/route-util');
const {body, validationResult} = require('express-validator/check');

router.post('/', [
  body('email').isLength({max: 255}).isEmail().not().isEmpty(),
  body('password').isLength({min: 5, max: 32}).not().isEmpty(),
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

  try {
    const password = await HashUtil.hashPassword(req.body.password);

    model.User.create({
      email: req.body.email,
      password: password,
      pseudo: req.body.pseudo,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      address: req.body.address,
      IBAN: req.body.IBAN,
    })
      .then(() => {
        res.status(201).json({message: 'user created'});
      })
      .catch( model.sequelize.UniqueConstraintError, () => {
        next(RouteUtil.createError('user exists', 401));
      });
  } catch (e) {
    next(RouteUtil.createError('Registration error', 500));
  }
});

module.exports = router;
