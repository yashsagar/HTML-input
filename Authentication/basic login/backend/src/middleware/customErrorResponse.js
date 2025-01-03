export const customErrorResponse = (req, res, next) => {
  res.customErrorRes = function (error = {}) {
    const {
      status = 400,
      success = false,
      message = "somthing went wrong",
      data = null,
    } = error;
    this.status(status).json({ success, message, data: data && data });
  };
  next();
};
