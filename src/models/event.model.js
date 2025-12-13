const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const randomEventId = () => {
  return "E-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => randomEventId(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Event;
