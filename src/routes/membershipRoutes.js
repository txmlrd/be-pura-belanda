// membership.routes.js
const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");

router.post("/", membershipController.createMembership);

router.get("/user/:userId", membershipController.getMembershipByUserId);

router.patch("/:id", membershipController.updateMembership);

router.delete("/:id", membershipController.deleteMembership);

module.exports = router;
