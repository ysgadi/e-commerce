const bcrypt = require('bcryptjs');

const ROUND = 9;

module.exports = {
  hashPassword: function(password) {
    return bcrypt.hash(password, ROUND);
  },

  comparePassword: function(password, hash) {
    return bcrypt.compare(password, hash);
  },

  hashPasswordSync: function(password) {
    return bcrypt.hashSync(password, ROUND);
  },

  comparePasswordSync: function(password, hash) {
    return bcrypt.compareSync(password, hash);
  },
};
