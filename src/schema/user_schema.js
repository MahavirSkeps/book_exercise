const Joi = require('joi');

const signupSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role : Joi.string().alphanum()

});
// const loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
//   });

module.exports = signupSchema;