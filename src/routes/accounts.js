var express = require('express');
var router = express.Router();

const accountsValidation = require('../validations/accounts'); 
const accountsController = require('../controllers/accounts');

router.post('/signup', accountsValidation.signupValidator, accountsController.signup);
router.post('/login', accountsValidation.loginValidator, accountsController.login);



module.exports = router;