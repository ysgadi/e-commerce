const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

module.exports = {
  JWT_SECRET: JWT_SECRET,
  createToken: function(payload, options) {
    return options
      ? jwt.sign(payload, JWT_SECRET, options)
      : jwt.sign(payload, JWT_SECRET);
  },
};
