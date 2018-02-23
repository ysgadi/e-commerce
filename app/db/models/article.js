module.exports = function(sequelize, DataTypes) {
  const Article = sequelize.define('Article', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [0, 100],
        notEmpty: true,
      },
    },
    description: {
      // eslint-disable-next-line new-cap
      type: DataTypes.STRING(500),
      validate: {
        len: [0, 500],
      },
    },
    price: {
      // eslint-disable-next-line new-cap
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
        max: 1000000000,
      },
    },
    category: {
      // eslint-disable-next-line new-cap
      type: DataTypes.ENUM('Multimedia', 'Informatique',
        'Vehicule', 'Service', 'Exterieur',
        'Interieur', 'Autre'),
      defaultValue: 'Autre',
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['Multimedia', 'Informatique',
          'Vehicule', 'Service', 'Exterieur',
          'Interieur', 'Autre']],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        notEmpty: true,
        isNumeric: true,
        min: 0,
        max: 100000,
      },
    },
  });

  Article.associate = function(models) {
    models.Article.belongsTo(models.User, {
      as: 'owner',
      foreignKey: 'ownerId',
    });
  };

  return Article;
};
