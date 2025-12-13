const { success, error } = require("../helpers/response");
const authService = require("../services/authService");
const User = require("../models/user.model");
const bcrypt = require('bcrypt');

module.exports = {
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
