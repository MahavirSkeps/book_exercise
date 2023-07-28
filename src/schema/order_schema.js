const Joi = require('joi');

const mmYyFormatValidator = (value, helpers) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const order_schema = Joi.object({
  count: Joi.number().required(),
  card_number: Joi.string().pattern(/^\d+$/).min(16).max(16).required(),
  cvv: Joi.string().min(3).max(9).pattern(/^\d+$/).required(),
  expiry: Joi.string().custom(mmYyFormatValidator, 'custom mm/yy format validation').required(), 
});


module.exports = order_schema;