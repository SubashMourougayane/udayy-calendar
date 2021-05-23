
const Joi = require('@hapi/joi');
const GATEKEEPER = require('../gatekeeper/gatekeeper')

const createFixedEventValidator = (req, res, next) => {
    const createFixedEventSchema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        startTime : Joi.string().required(),
        endTime : Joi.string().required(),
        isRecurring : Joi.boolean().required()
    });
    const { error } = createFixedEventSchema.validate(req.body)

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
    createFixedEventValidator,
    
};