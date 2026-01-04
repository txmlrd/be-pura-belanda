const { EventAttendee, User, UserFamilyMember } = require("../models");
const sequelize = require("../config/database");
const crypto = require("crypto");

const generateQrToken = () => {
  return crypto.randomUUID();
};

module.exports = {
  // Register user to event
  // registerToEvent: async ({ event_id, user_id }) => {
  //   // cek apakah sudah terdaftar
  //   const existing = await EventAttendee.findOne({
  //     where: { event_id, user_id },
  //   });

  //   if (existing) {
  //     return null; // sudah terdaftar
  //   }

  //   return await EventAttendee.create({
  //     event_id,
  //     user_id,
  //     qr_code_token: generateQrToken(),
  //   });
  // },
  registerToEvent: async ({ event_id, user_id }) => {
    return sequelize.transaction(async (t) => {
      const user = await User.findByPk(user_id, { transaction: t });
      if (!user) throw new Error("User not found");

      const alreadyRegistered = await EventAttendee.findOne({
        where: {
          event_id,
          user_id,
          attendee_type: "user",
        },
        transaction: t,
      });

      if (alreadyRegistered) {
         return null;
      }

      const safeCreate = async (payload) => {
        try {
          await EventAttendee.create(payload, { transaction: t });
        } catch (err) {
          if (err.name !== "SequelizeUniqueConstraintError") throw err;
        }
      };

      // USER
      await safeCreate({
        event_id,
        user_id,
        attendee_type: "user",
        attendee_name: user.name,
        qr_code_token: generateQrToken(),
      });

      // FAMILY
      const familyMembers = await UserFamilyMember.findAll({
        where: { user_id },
        transaction: t,
      });

      for (const family of familyMembers) {
        await safeCreate({
          event_id,
          user_id,
          attendee_type: "family",
          family_member_id: family.familyMemberId,
          attendee_name: family.name,
          qr_code_token: generateQrToken(),
        });
      }

      return {
        success: true,
        message: "User & family registered to event",
      };
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
