const Joi = require("joi");

exports.signupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
  });

  return schema.validateAsync(data);
};

exports.signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
  });

  return schema.validateAsync(data);
};


