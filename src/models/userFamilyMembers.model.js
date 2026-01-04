const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserFamilyMember = sequelize.define(
  "UserFamilyMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Reference to User ID",
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Name of the family member",
    },
    relationship_status: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Relationship to the user",
    },
  },
  {
    tableName: "user_family_members",
    indexes: [
      {
        fields: ["user_id"],
      },
    ],
  }
);

module.exports = UserFamilyMember;
