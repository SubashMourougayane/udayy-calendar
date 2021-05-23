const Event = require('../models').events;
const GATEKEEPER = require('../gatekeeper/gatekeeper');
const { Op } = require('sequelize')
const calendarUtils = require('../utils/calendar')
var uniqid = require('uniqid');

module.exports.createEvent = async (req, res, next) => {

    let startDate = req.body.startDate
    let startTime = req.body.startTime
    let endDate = req.body.endDate
    let endTime = req.body.endTime

    let overlapObject = await calendarUtils.checkOverlapEvent(req.user.id, startDate, endDate, startTime, endTime)
    if (overlapObject.length === 0) {

        req.body['userId'] = req.user.id;

        if (req.body.isRecurring) {

            startDate = new Date(startDate)
            let month = new Date(startDate).getMonth();
            let year = new Date(startDate).getFullYear();
            let day = new Date(startDate).getDay();

            endDate = req.body.endDate ? new Date(endDate) : new Date(new Date(startDate).setFullYear(year + 1));


            let iDate = new Date(startDate);
            let recurringObjects = []
            let uniqueTag = uniqid();
            while (iDate <= endDate) {

                if (req.body.daysOfWeek.includes(iDate.getDay())) {
                   
                
                    let tempObj = {
                        userId : req.user.id,
                        title : req.body.title,
                        description : req.body.description,
                        startDate : iDate,
                        endDate : iDate,
                        startTime : req.body.startTime,
                        endTime : req.body.endTime,
                        isRecurring : req.body.isRecurring,
                        recurringType : req.body.recurringType,
                        daysOfWeek : req.body.daysOfWeek,
                        uniqueTag : uniqueTag
                    }
                    recurringObjects.push(tempObj)

                }

                let temp = iDate.setDate(iDate.getDate() + 1)
                iDate = new Date(temp)
            }
            Event.bulkCreate(recurringObjects)
                .then(data => {
                    GATEKEEPER.successDataResponse(res, data);
                })
                .catch(err => {
                    GATEKEEPER.serverError(res, "Error creating event");

                })



        } else {

            Event.create(req.body)
                .then(data => {
                    GATEKEEPER.successDataResponse(res, data);
                })
                .catch(err => {
                    GATEKEEPER.serverError(res, "Error creating event");

                })
        }


    } else {
        GATEKEEPER.clientError(res, `Event Overlaping with another event`)
    }

}


module.exports.getEvents = (req, res, next) => {
    let startDate = new Date(req.query.startDate)
    let endDate = new Date(req.query.endDate);


    Event.findAll({
        raw: true,
        where: {
            userId: req.user.id,
            [Op.or]: [
                {
                    startDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                {
                    endDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                {
                    [Op.and]: [
                        {
                            startDate: {
                                [Op.lte]: startDate
                            },
                            endDate: {
                                [Op.gte]: endDate
                            }
                        },

                    ],
                }
            ]
        }
    })
        .then(data => {
            GATEKEEPER.successDataResponse(res, data);
        })
        .catch(err => {
            GATEKEEPER.serverError(res, "Error creating event");

        })

}

module.exports.editOneInstance = (req, res, next) => {
    Event.update(req.body, {
        where : {
            userId : req.user.id,
            id : req.params.id
        },
        returning: true,
    }).then(data => {
        GATEKEEPER.successDataResponse(res, data[1]);
    })
    .catch(err => {
        GATEKEEPER.serverError(res, "Error creating event");

    })
}

module.exports.editFromOneInstance = (req, res, next) => {
    Event.update(req.body, {
        where : {
            userId : req.user.id,
            uniqueTag : req.params.uniqueTag,
            id : {
                [Op.gte] : req.params.id
            }
        },
        returning : true
    }).then(data => {
        GATEKEEPER.successDataResponse(res, data[1]);
    })
    .catch(err => {
        GATEKEEPER.serverError(res, "Error creating event");

    })
}