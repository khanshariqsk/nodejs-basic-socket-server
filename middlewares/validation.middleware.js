const { HttpBadRequestError } = require("../services/error.service");

exports.handleValidation = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req.body);
      return next();
    } catch (error) {
      return next(new HttpBadRequestError(error.message));
    }
  };
};
