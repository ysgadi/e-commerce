module.exports = function(sequelize, DataTypes) {
  const Sold = sequelize.define('Sold', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        notEmpty: true,
        isNumeric: true,
        min: 1,
        max: 100000,
      },
    },
  });

  Sold.associate = function(models) {
    models.User.belongsToMany(models.Article, {
      as: 'soldArticle',
      through: Sold,
    });
    models.Article.belongsToMany(models.User, {
      as: 'soldArticle',
      through: Sold,
    });
  };

  return Sold;
};
