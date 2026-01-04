const express = require("express");
const controller = require("../controllers/userFamilyMemberController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/",auth, controller.addFamilyMember);
router.get("/",auth, controller.getFamilyMembers);
router.put("/:id",auth, controller.updateFamilyMember);
router.delete(
  "/:id",
  auth, controller.deleteFamilyMember
);

module.exports = router;