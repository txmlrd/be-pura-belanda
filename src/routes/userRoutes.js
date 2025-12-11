const express = require("express");
const controller = require("../controllers/userController");

const router = express.Router();

router.post("/", controller.createUser);
router.get("/", controller.getAllUsers);
router.delete("/:id", controller.deleteUser);

module.exports = router;
