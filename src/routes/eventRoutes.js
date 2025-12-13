const express = require("express");
const controller = require("../controllers/eventController");

const router = express.Router();

router.post("/", controller.createEvent);
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);
module.exports = router;
