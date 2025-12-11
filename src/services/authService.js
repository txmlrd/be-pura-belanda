const jwt = require('jsonwebtoken');


module.exports = {
  getUserToken: async (id) => {
    const token = jwt.sign({ id: id }, process.env.SECRET, {
      expiresIn: 86400
    });
    return token;
  }
};