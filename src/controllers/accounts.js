const bcrypt = require('bcrypt');
const Users = require('../models').users;
const GATEKEEPER = require('../gatekeeper/gatekeeper');
const JWT = require('../utils/jwt');

module.exports.signup = (req, res, next) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    Users.create(req.body)
        .then(data => {
            GATEKEEPER.successDataResponse(res, "Signup success, Please login to access dashboard");
        })
        .catch(err => {
            GATEKEEPER.serverError(res, "Error creating user");

        })

}



module.exports.login = (req, res, next) => {
    Users.login(req.body)
        .then(async (data) => {
            const validatePass = await bcrypt.compare(req.body.password, data.dataValues.password);
            if (validatePass) {
                delete data.dataValues['password'];
                GATEKEEPER.setCookiesToResponse(res, JWT.generateToken(data.dataValues))

            }
        })
        .catch(err => {
            next(err);
        })
}
