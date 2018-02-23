module.exports = {
  'host': process.env.DB_HOST,
  'dialect': 'mysql',
  'username': process.env.DB_USER,
  'password': process.env.DB_PASSWORD,
  'database': process.env.DB_DATABASE,
  'charset': 'utf8',
  'collate': 'utf8_general_ci',
  'logging': process.env.NODE_ENV !== 'production',
};
