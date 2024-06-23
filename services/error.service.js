const { IS_PRODUCTION } = require("../config");

class HttpBadRequestError {
  constructor(message) {
    this.message = message;
    this.statusCode = 400;
  }
}

class HttpConflictError {
  constructor(message) {
    this.message = message;
    this.statusCode = 409;
  }
}

class HttpNotFoundError {
  constructor(message) {
    this.message = message;
    this.statusCode = 404;
  }
}

class HttpUnAuthenticatedError {
  constructor() {
    this.message = "UnAuthenticated";
    this.statusCode = 401;
  }
}
class HttpUnAuthorisedError {
  constructor(message) {
    this.message = message || "UnAuthorised";
    this.statusCode = 403;
  }
}

class HttpError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

class InternalServerError {
  constructor(message) {
    this.message = IS_PRODUCTION ? "Internal Server Error" : message;
    this.statusCode = 500;
  }
}

exports.HttpBadRequestError = HttpBadRequestError;
exports.HttpError = HttpError;
exports.HttpConflictError = HttpConflictError;
exports.HttpNotFoundError = HttpNotFoundError;
exports.InternalServerError = InternalServerError;
exports.HttpUnAuthenticatedError = HttpUnAuthenticatedError;
exports.HttpUnAuthorisedError = HttpUnAuthorisedError;
