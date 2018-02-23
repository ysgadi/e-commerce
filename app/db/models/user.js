module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [0, 255],
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255],
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
      },
    },
    IBAN: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 255],
      },
    },
  }, {
    indexes: [
      {fields: ['email', 'password']},
    ],
  });

  User.associate = function(models) {
    models.User.hasMany(models.Article, {
      as: 'sellArticles',
      foreignKey: 'ownerId',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
