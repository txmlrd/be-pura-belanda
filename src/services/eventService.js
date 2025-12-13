const Event = require("../models/event.model");

module.exports = {
  createEvent: async (data) => {
    return await Event.create(data);
  },

  getAllEvents: async () => {
    return await Event.findAll();
  },

  getEventById: async (eventId) => {
    return await Event.findByPk(eventId);
  },

  updateEvent: async (eventId, data) => {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return null;
    }
    return await event.update(data);
  },

  deleteEvent: async (eventId) => {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return null;
    }
    await event.destroy();
    return true;
  },
};
