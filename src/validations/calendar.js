
const Joi = require('@hapi/joi');
const GATEKEEPER = require('../gatekeeper/gatekeeper')

const createFixedEventValidator = (req, res, next) => {
    const createFixedEventSchema = Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        startTime : Joi.string().required(),
        endTime : Joi.string().required(),
        isRecurring : Joi.boolean().required(),
        recurringType : Joi.string(),
        daysOfWeek : Joi.array(),
        maxPeriodInDays : Joi.number()
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

const editOneInstanceEventValidator = (req, res, next) => {
    const editOneInstanceSchema = Joi.object().keys({
        title: Joi.string(),
        description: Joi.string(),
        startTime : Joi.string(),
        endTime : Joi.string(),
        startDate : Joi.date(),
        endDate : Joi.date(),
       
    });
    const { error } = editOneInstanceSchema.validate(req.body)

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
    editOneInstanceEventValidator
    
};