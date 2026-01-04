// membership.routes.js
const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");
const auth = require("../middlewares/auth");

router.post("/",auth, membershipController.createMembership);

router.get("/",auth, membershipController.getAllMemberships);

router.get("/user/:userId", auth, membershipController.getMembershipByUserId);

router.patch("/:id", auth, membershipController.updateMembership);

router.delete("/:id", auth,  membershipController.deleteMembership);

module.exports = router;
