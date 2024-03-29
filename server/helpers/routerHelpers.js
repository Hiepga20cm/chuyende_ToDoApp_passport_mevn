const Joi = require("@hapi/joi");

const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);
    // console.log(validatorResult.error[Error[ValidationError]]);
    if (validatorResult.error) {
      return res
        .status(400)
        .json({ data: validatorResult.error, message: "invalid validation" });
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.body = validatorResult.value;
      next();
    }
  };
};

const validateParam = (schema, name) => {
  return (req, res, next) => {
    console.log(req.params);
    const validatorResult = schema.validate({ param: req.params[name] });
    if (validatorResult.error) {
      console.log('1',validatorResult);
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};

      req.value.params[name] = req.params[name];
      next();
    }
  };
};

const schemas = {
  newTaskSchema: Joi.object().keys({
    Name: Joi.string().required(),
    Notes: Joi.string(),
    Status: Joi.string(),
    Owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    Collaborator: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    StartDate: Joi.date(),
    EndDate: Joi.date(),
  }),

  newProjectSchema: Joi.object().keys({
    Name: Joi.string().required(),
    Notes: Joi.string(),
    Status: Joi.string(),
    Owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    Collaborator: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    StartDate: Joi.date(),
    EndDate: Joi.date(),
  }),
  authSignInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  authSignUpSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),

  userSchema: Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
  }),

  userOptionalSchema: Joi.object().keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email(),
  }),
};

module.exports = {
  validateBody,
  validateParam,
  schemas,
};
