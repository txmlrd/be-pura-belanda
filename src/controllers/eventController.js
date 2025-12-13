const { success, error } = require("../helpers/response");
const eventService = require("../services/eventService");
module.exports = {
  createEvent: async (req, res) => {
    try {
      const eventData = req.body;
      const newEvent = await eventService.createEvent(eventData);
      return success(res, "Event created successfully", newEvent, 201);
    } catch (e) {
      console.error(e);
      return error(res, "Event creation failed", 500);
    }
  },
  getEventById: async (req, res) => {
    try {
      const eventId = req.params.id.toUpperCase(); //force uppercase
      const event = await eventService.getEventById(eventId);
      if (!event) {
        return error(res, "Event not found", 404);
      }
      return success(res, "Event retrieved successfully", event, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to retrieve event", 500);
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await eventService.getAllEvents();
      return success(res, "Events retrieved successfully", events, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to retrieve events", 500);
    }
  },

  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const eventData = req.body;
      const updatedEvent = await eventService.updateEvent(eventId, eventData);
      if (!updatedEvent) {
        return error(res, "Event not found", 404);
      }
      return success(res, "Event updated successfully", updatedEvent, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Event update failed", 500);
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      const deleted = await eventService.deleteEvent(eventId);
      if (!deleted) {
        return error(res, "Event not found", 404);
      }
      return success(res, "Event deleted successfully", null, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Event deletion failed", 500);
    }
  },
};
