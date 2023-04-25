const Joi = require("joi");

const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return res.status(400).json({ message: result.error.message });
        }   
         
        if (!req.value) {
        req.value = {};
        }
        req.value['body'] = result.value;
        next();
    };
};
   
const schemas = {
    signupSchema: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
    courseSchema: Joi.object().keys({
        course_name: Joi.string().valid("Backend Development", "Frontend Development", "Data Science", "Machine Learning").required(),
        price: Joi.number().required(),
    }),

};

module.exports = {
    validateRequest,
    schemas,
};