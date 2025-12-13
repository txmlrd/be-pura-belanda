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
      comment: "Reference to Event ID",
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Reference to User ID",
    },

    is_present: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: "Attendance status (checked-in or not)",
    },

    qr_code_token: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Unique token for QR check-in",
    },

    checked_in_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Timestamp when attendee checked in",
    },
  },
  {
    tableName: "event_attendees",
    indexes: [
      {
        unique: true,
        fields: ["qr_code_token"],
      },
      {
        unique: true,
        fields: ["event_id", "user_id"],
      },
    ],
  }
);

module.exports = EventAttendee;
