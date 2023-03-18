const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:password@localhost:5432/mydb', {
  logging: false,
});

module.exports = sequelize;
