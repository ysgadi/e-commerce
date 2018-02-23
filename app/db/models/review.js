module.exports = function(sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    comment: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(500),
      allownull: false,
      validate: {
        len: [0, 500],
        notEmpty: true,
      },
    },
  });

  Review.associate = function(models) {
    models.User.belongsToMany(models.User, {
      as: 'reviewReceived',
      foreignKey: 'reviewerId',
      through: Review,
    });
    models.User.belongsToMany(models.User, {
      as: 'reviewGiven',
      foreignKey: 'reviewedId',
      through: Review,
    });
  };

  return Review;
};
