const attendeeService = require("../services/eventAttendee");
const { success, error } = require("../helpers/response");

module.exports = {
  // POST /events/:eventId/register
  registerToEvent: async (req, res) => {
    try {
      const event_id = req.params.eventId;
      const user_id = req.user.id; // dari JWT

      const attendee = await attendeeService.registerToEvent({
        event_id,
        user_id,
      });

      if (!attendee) {
        return error(res, "User already registered for this event", 400);
      }

      return success(
        res,
        "Successfully registered to event",
        {
          attendee_id: attendee.id,
          qr_code_token: attendee.qr_code_token,
        },
        201
      );
    } catch (e) {
      console.error(e);
      return error(res, "Failed to register to event", 500);
    }
  },

  // POST /events/check-in
  checkIn: async (req, res) => {
    try {
      const { qr_code_token } = req.body;

      if (!qr_code_token) {
        return error(res, "QR token is required", 400);
      }

      const attendee = await attendeeService.checkInByQr(qr_code_token);

      if (!attendee) {
        return error(res, "Invalid QR token", 404);
      }

      return success(res, "Check-in successful", {
        attendee_id: attendee.id,
        checked_in_at: attendee.checked_in_at,
      });
    } catch (e) {
      if (e.message === "Already checked in") {
        return error(res, e.message, 400);
      }
      console.error(e);
      return error(res, "Check-in failed", 500);
    }
  },

  // GET /events/:eventId/attendees
  getEventAttendees: async (req, res) => {
    try {
      const event_id = req.params.eventId;

      const attendees = await attendeeService.getAttendeesByEvent(event_id);

      return success(res, "Attendees fetched", attendees);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to get attendees", 500);
    }
  },
};
