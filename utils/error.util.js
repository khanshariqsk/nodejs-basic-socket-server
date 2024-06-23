exports.globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";
  
    return res
      .status(statusCode)
      .json({ errorMessage, statusCode, success: false });
  };
  
  exports.noRouteFound = (req, res, next) => {
    return res.status(404).json({ errorMessage: "Route not found!" });
  };