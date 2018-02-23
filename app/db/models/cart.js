module.exports = function(sequelize, DataTypes) {
  const Cart = sequelize.define('Cart', {
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

  Cart.associate = function(models) {
    models.User.belongsToMany(models.Article, {
      as: 'cartArticle',
      through: Cart,
    });
    models.Article.belongsToMany(models.User, {
      as: 'cartArticle',
      through: Cart,
    });
  };

  return Cart;
};
