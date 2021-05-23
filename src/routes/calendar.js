var express = require('express');
var router = express.Router();

const calendarValidation = require('../validations/calendar'); 
const calendarController = require('../controllers/calendar');

router.post('/event', calendarValidation.createFixedEventValidator, calendarController.createEvent);
router.get('/events', calendarController.getEvents);
router.put('/event/:id', calendarValidation.editOneInstanceEventValidator, calendarController.editOneInstance);
router.put('/event/:uniqueTag/:id', calendarValidation.editOneInstanceEventValidator, calendarController.editFromOneInstance);





module.exports = router;