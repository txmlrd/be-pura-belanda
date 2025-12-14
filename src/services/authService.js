const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = {
  authRegister: async (user) => {
    return await User.create(user);
  },

  getUserToken: async (id, email, role) => {
    const token = jwt.sign({ id: id, email: email, role: role }, process.env.SECRET, {
      expiresIn: 86400,
    });
    return token;
  },
};
