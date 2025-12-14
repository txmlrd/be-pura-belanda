const User = require("../models/user.model");

module.exports = {
  getMe: async (id) => {
    return await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  },

  createUser: async (data) => {
    return await User.create(data);
  },

  getAllUsers: async () => {
    return await User.findAll();
  },

  getUserById: async (id) => {
    return await User.findByPk(id);
  },

  updateUser: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    return await user.update(data);
  },

  deleteUser: async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }

    await user.destroy();
    return true;
  },
};
