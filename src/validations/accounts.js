const Joi = require('@hapi/joi');
const GATEKEEPER = require('../gatekeeper/gatekeeper')

const signupValidator = (req, res, next) => {
    const signupValidationSchema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = signupValidationSchema.validate(req.body)

    if (error) {
        return GATEKEEPER.clientError(res, {
            error: 'BadRequestError',
            message: 'Request doesn\'t contain all the required fields.',
            errors: error.details.map(detail => detail.message),
        });
    }
    next();

}

const loginValidator = (req, res, next) => {
    const loginValidationSchema = Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { error } = loginValidationSchema.validate(req.body)

    if (error) {
        return GATEKEEPER.clientError(res, {
            error: 'BadRequestError',
            message: 'Request doesn\'t contain all the required fields.',
            errors: error.details.map(detail => detail.message),
        });
    }
    next();

}


module.exports = {
    signupValidator,
    loginValidator
};