const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const randomId = () => {
  return "M-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const Membership = sequelize.define(
  "Membership",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => randomId(),
    },

    package_type: {
      type: DataTypes.ENUM("normal", "couple"),
      allowNull: false,
    },

    payment_proof: {
      type: DataTypes.STRING,
      allowNull: true, // user upload, boleh kosong dulu
    },

    status: {
      type: DataTypes.ENUM("pending", "active", "expired"),
      defaultValue: "pending",
    },

    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    primary_user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    secondary_user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = Membership;
