const jwt = require("jsonwebtoken");

module.exports = {
  getUserToken: async (id, email, role) => {
    const token = jwt.sign({ id: id, email: email, role: role }, process.env.SECRET, {
      expiresIn: 86400,
    });
    return token;
  },
};
