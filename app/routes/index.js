const express = require('express');
const router = express.Router();
const RouteUtil = require('../helpers/route-util');
const jwtMiddleware = require('express-jwt');
const JwtUtil = require('../helpers/jwt-util');

router.use('/login', require('./login'));

router.use('/register', require('./register'));

router.use('/accounts',
  jwtMiddleware({secret: JwtUtil.JWT_SECRET}),
  require('./accounts'));

router.use('/users', require('./users'));

router.use('/articles', require('./articles'));

router.use('/reviews', require('./reviews'));

router.use('/carts',
  jwtMiddleware({secret: JwtUtil.JWT_SECRET}),
  require('./carts'));


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(RouteUtil.createError('Not Found', 404));
});

// error handler
router.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  delete err.status;

  res.json({
    message: err.message,
    errors: req.app.get('env') !== 'production' ? err : {},
  });
});

module.exports = router;
