const Joi = require("joi");
const { methodTypes } = require("../utils/constant.util");

exports.saveJobValidation = (data) => {
  const schema = Joi.object({
    metrics: Joi.object().pattern(/^.*$/, Joi.string().required()).required(),
    interval: Joi.string().default("5 min").required(),
    isJobStarted: Joi.boolean().default(false),
    url: Joi.string().required(),
    methodType: Joi.string()
      .valid(...Object.values(methodTypes))
      .default(methodTypes.GET)
      .required(),
    headers: Joi.object().pattern(/./, Joi.string().required()).required(),
    queryParams: Joi.object().pattern(/./, Joi.string().required()),
  });

  return schema.validateAsync(data);
};
