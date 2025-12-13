const User = require("./user.model");
const Event = require("./event.model");
const EventAttendee = require("./eventAttendee.model");


Event.hasMany(EventAttendee, {
  foreignKey: "event_id",
  as: "attendees",
});

User.hasMany(EventAttendee, {
  foreignKey: "user_id",
  as: "eventAttendances",
});

Event.belongsToMany(User, {
  through: EventAttendee,
  foreignKey: "event_id",
  otherKey: "user_id",
  as: "users",
});

User.belongsToMany(Event, {
  through: EventAttendee,
  foreignKey: "user_id",
  otherKey: "event_id",
  as: "events",
});

EventAttendee.belongsTo(Event, { foreignKey: "event_id" });
EventAttendee.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Event,
  EventAttendee,
};
