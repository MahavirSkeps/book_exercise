const Joi = require('joi');

const addBookSchema = Joi.object({
  title: Joi.string().alphanum().min(3).max(30).required(),
  author: Joi.string().alphanum().min(3).max(30).required(),
  genre: Joi.string().alphanum().min(3).max(30),
  price: Joi.number().required(),
  stock : Joi.number().required()

});
// const loginSchema = Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
//   });

module.exports = addBookSchema;