const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const HeartRate = sequelize.define('HeartRate', {
  patientId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fromDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  toDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  low: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  high: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = HeartRate;
