const { EventAttendee } = require("../models");
const crypto = require("crypto");

const generateQrToken = () => {
  return crypto.randomUUID();
};

module.exports = {
  // Register user to event
  registerToEvent: async ({ event_id, user_id }) => {
    // cek apakah sudah terdaftar
    const existing = await EventAttendee.findOne({
      where: { event_id, user_id },
    });

    if (existing) {
      return null; // sudah terdaftar
    }

    return await EventAttendee.create({
      event_id,
      user_id,
      qr_code_token: generateQrToken(),
    });
  },

  // Check-in by QR token
  checkInByQr: async (qrToken) => {
    const attendee = await EventAttendee.findOne({
      where: { qr_code_token: qrToken },
    });

    if (!attendee) return null;

    if (attendee.is_present) {
      throw new Error("Already checked in");
    }

    attendee.is_present = true;
    attendee.checked_in_at = new Date();
    await attendee.save();

    return attendee;
  },

  // Get all attendees for an event
  getAttendeesByEvent: async (event_id) => {
    return await EventAttendee.findAll({
      where: { event_id },
    });
  },
};
