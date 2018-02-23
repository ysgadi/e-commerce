const express = require('express');
const router = express.Router();
const model = require('../db/models');
const RouteUtil = require('../helpers/route-util');

router.use('/:id', async function(req, res, next) {
  const id = req.params.id;
  const user = await model.User.findById(id, {
    attributes: {exclude: ['password', 'email', 'address']},
  });

  if (user === null) {
    return next(RouteUtil.createError('User not found', 404));
  }

  res.status(200).json(user);
});

module.exports = router;
