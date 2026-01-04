const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const randomAttendeeId = () => {
  return "A-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const EventAttendee = sequelize.define(
  "EventAttendee",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => randomAttendeeId(),
    },

    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    attendee_type: {
      type: DataTypes.ENUM("user", "family"),
      allowNull: false,
    },

    family_member_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    attendee_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_present: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    qr_code_token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    checked_in_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "event_attendees",
    indexes: [
      {
        unique: true,
        fields: ["event_id", "user_id"],
        where: { attendee_type: "user" },
      },
      {
        unique: true,
        fields: ["event_id", "family_member_id"],
        where: { attendee_type: "family" },
      },
    ],
    validate: {
      familyMemberRules() {
        if (this.attendee_type === "family" && !this.family_member_id) {
          throw new Error("family_member_id is required for family attendee");
        }
        if (this.attendee_type === "user" && this.family_member_id) {
          throw new Error("family_member_id must be null for user attendee");
        }
      },
    },
  }
);

module.exports = EventAttendee;
