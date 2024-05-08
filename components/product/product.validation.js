const Joi = require("joi");

const productSchema = Joi.object({
    productName : Joi.string().required(),
    productPrice : Joi.string().required(),
    productImageUrl : Joi.string().required(),
    productDescription : Joi.string().min(3)
})

module.exports = productSchema