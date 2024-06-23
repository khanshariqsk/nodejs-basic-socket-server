exports.HttpSuccess = (res, data = null, message = "Request Successful") => {
  const statusCode = 200;
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

exports.HttpSuccessCreated = (
  res,
  data = null,
  message = "Request Successful"
) => {
  const statusCode = 201;
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
  });
};

exports.HttpSuccessWithNoData = (res, message = "Request Successful") => {
  return res.status(204).json({
    success: true,
    statusCode,
    message,
    data: [],
  });
};
