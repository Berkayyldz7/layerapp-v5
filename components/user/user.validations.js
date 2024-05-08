// Önce bir joi object ile şema oluştur.
// Sonra bu arkadaşı bir middleware'ye ver.
// Middleware'ler routing seviyesinde çalışır. 

const Joi = require("joi");

const schema = Joi.object({
    name : Joi.string().required().min(5),
    password : Joi.string().required().min(8),
    email : Joi.string().email().required(),
    isAdmin : Joi.boolean().required()
})

const resetPasswordCheckSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required().min(8),
})

module.exports = {
    schema,
    resetPasswordCheckSchema
}