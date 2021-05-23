const Event = require('../models').events;
const { Op } = require('sequelize')
const checkOverlapEvent = async (userId, startDate, endDate, startTime, endTime) => {
    return await Event.findAll({
        raw: true,
        where: {
            userId: userId,
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
}


module.exports = {
    checkOverlapEvent
}