
var express = require('express');
var router = express.Router();
const accounts = require('./accounts')
const calendar = require('./calendar')
const ApiAuth = require('../middlewares/auth')


router.use('/accounts',accounts)
router.use(ApiAuth)
router.use('/calendar',calendar)



module.exports = router;