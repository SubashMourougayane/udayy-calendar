var express = require('express');
var router = express.Router();

const calendarValidation = require('../validations/calendar'); 
const calendarController = require('../controllers/calendar');

router.post('/fixed-event', calendarValidation.createFixedEventValidator, calendarController.createFixedEvent);
router.get('/events', calendarController.getEvents);



module.exports = router;