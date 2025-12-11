const User = require("../models/user.model");
const userService = require("../services/userService");
const { success, error } = require("../helpers/response");

module.exports = {
  createUser: async (req, res) => {
    const isEmailExist = await User.findOne({ where: { email: req.body.email } });
    if (isEmailExist) {
      return error(res, "Email already in use", 400);
    }

    try {
      const user = await userService.createUser(req.body);
      return success(
        res,
        "User Created",
        {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          number: user.number,
        },
        201
      );
    } catch (e) {
      console.log(e);
      return error(res, "User Creation Failed", 500);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      const formattedData = users.map((item) => ({
        id: item.id,
        email: item.email,
      }));
      return success(res, "Get All Users Successfully", formattedData, 201);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to get All Users", 500);
    }
  },

  deleteUser: async (req, res) => {
    console.log(req);
    try {
      const user = await userService.deleteUser(req.params.id);

      if (!user) {
        return error(res, `User with id ${req.params.id} is not available`, 404);
      }
      return success(res, `User with id ${req.params.id} successfully deleted`, null, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to delete user", 500);
    }
  },
};
