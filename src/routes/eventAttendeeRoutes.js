const express = require("express");
const controller = require("../controllers/eventAttendeeController");
const auth = require("../middlewares/auth");

const router = express.Router();

// register user to event
router.post("/:eventId/register", auth, controller.registerToEvent);

// check-in via QR
router.post("/check-in", controller.checkIn);

// get attendees by event (admin)
router.get("/:eventId/attendees", auth, controller.getEventAttendees);

module.exports = router;
