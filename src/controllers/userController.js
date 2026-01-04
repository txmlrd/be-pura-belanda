const User = require("../models/user.model");
const userService = require("../services/userService");
const { success, error } = require("../helpers/response");

module.exports = {
  getMe: async (req, res) => {
    try {
      const user = await userService.getMe(req.user.id);
      if (!user) {
        return error(res, "User not found", 404);
      }
      return success(res, "User retrieved successfully", user, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to retrieve user", 500);
    }
  },
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
          name: user.name,
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

  updateUserByAdmin: async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return error(res, `User with id ${req.params.id} is not available`, 404);
      }
      return success(res, `User with id ${req.params.id} successfully updated`, user, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to update user", 500);
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const allowedFields = ["name", "number", "password", "address"]; // nanti bisa di buat dinamis sesuai kebutuhan

      const forbiddenFields = Object.keys(req.body).filter((key) => !allowedFields.includes(key));

      if (forbiddenFields.length > 0) {
        return error(res, `Field not allowed to update: ${forbiddenFields.join(", ")}`, 400);
      }

      const updateData = {};

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      if (Object.keys(updateData).length === 0) {
        return error(res, "No valid fields to update", 400);
      }
      const user = await userService.updateUser(userId, updateData);
      if (!user) {
        return error(res, `User with id ${userId} is not available`, 404);
      }
      return success(res, "User successfully updated", user, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Failed to update user", 500);
    }
  },
};
