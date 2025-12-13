const jwt = require("jsonwebtoken");
const { error } = require("../helpers/response");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return error(res, "Authorization header missing", 401);
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return error(res, "Invalid authorization format", 401);
    }

    const token = parts[1];

    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (e) {
    console.error(e);
    return error(res, "Invalid or expired token", 401);
  }
};
