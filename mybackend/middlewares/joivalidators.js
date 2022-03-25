const Joi = require('@hapi/joi');
const userschema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(30)
        .required(),

    pass: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(3).max(30),

    fname:Joi.string().required(),
    lname:Joi.string().required(),

})
module.exports ={
    userschema
}