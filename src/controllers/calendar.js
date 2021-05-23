const Event = require('../models').events;
const GATEKEEPER = require('../gatekeeper/gatekeeper');
const { Op } = require('sequelize')

module.exports.createFixedEvent = async (req, res, next) => {
    let startDate = req.body.startDate;
    let startTime = req.body.startTime;
    let endDate = req.body.endDate;
    let endTime = req.body.endTime;
    let overlapObject = await Event.findAll({
        raw: true,
        where: {
            userId: req.user.id,
            [Op.or]: [
                {
                    [Op.and]: [
                        {
                            startDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            [Op.or]: [
                                {
                                    startTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                },
                                {
                                    endTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                }
                            ]
                        }


                    ]
                },
                {
                    [Op.and]: [
                        {
                            endDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            [Op.or]: [
                                {
                                    startTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                },
                                {
                                    endTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                }
                            ]
                        }


                    ]
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
                        {
                            [Op.or]: [
                                {
                                    startTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                },
                                {
                                    endTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                }
                            ]
                        }

                    ],
                }
            ]
        }
    })
    console.log(overlapObject);
    if (overlapObject.length === 0){
        req.body['userId'] = req.user.id;
        Event.create(req.body)
            .then(data => {
                GATEKEEPER.successDataResponse(res, data);
            })
            .catch(err => {
                console.log(err);
                GATEKEEPER.serverError(res, "Error creating event");
    
            })
    }else{
        GATEKEEPER.clientError(res,`Event Overlaping with another event with the title ${overlapObject[0].title}`)
    }

}




module.exports.getEvents = (req, res, next) => {
    let startDate = new Date(req.query.startDate)
    let endDate = new Date(req.query.endDate);


    Event.findAndCountAll({
        raw: true,
        limit: req.query.pageSize || 10,
        offset: req.query.page || 1,
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
            console.log(data);
            GATEKEEPER.successPaginatedDataResponse(res, data, req.query.page || 1, req.query.pageSize || 10);
        })
        .catch(err => {
            console.log(err);
            GATEKEEPER.serverError(res, "Error creating event");

        })

}