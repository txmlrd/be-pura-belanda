const { success, error } = require("../helpers/response");
const authService = require("../services/authService");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, number } = req.body;
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return error(res, "Email already in use", 400);
      }
      const newUser = {
        name,
        email,
        password: password,
        number,
      };
      const user = await authService.authRegister(newUser);
      return success(
        res,
        "User Registered Successfully",
        {
          id: user.id,
          email: user.email,
          name: user.name,
          number: user.number,
        },
        201
      );
    } catch (e) {
      console.error(e);
      return error(res, "Registration Failed", 500);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return error(res, "User not found", 404);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return error(res, "Invalid password", 401);
      }
      const token = await authService.getUserToken(user.id, user.email, user.role);
      return success(res, "Login successful", { token: token }, 200);
    } catch (e) {
      console.error(e);
      return error(res, "Login failed", 500);
    }
  },
};
