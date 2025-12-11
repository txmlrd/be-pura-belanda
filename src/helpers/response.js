module.exports = {
  success: (res, message = "Success", data = null, statusCode = 200) => {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  },

  error: (res, message = "Error", statusCode = 500, data = null) => {
    return res.status(statusCode).json({
      status: "error",
      message,
      data,
    });
  },
};
