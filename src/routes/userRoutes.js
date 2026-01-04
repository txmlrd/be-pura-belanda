const express = require("express");
const controller = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", controller.createUser);
router.get("/", controller.getAllUsers);
router.delete("/:id", controller.deleteUser);
router.get("/me", auth, controller.getMe);
router.put("/update/:id", controller.updateUserByAdmin);
router.put("/update", auth, controller.updateUser);



module.exports = router;
