module.exports = {
  createError: function(message, status, errors) {
    const err = new Error(message);
    err.status = status || 500;
    err.errors = errors || {};

    return err;
  },
};
