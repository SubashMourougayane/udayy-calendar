const jwt = require('jsonwebtoken');
const GATEKEEPER = require('../gatekeeper/gatekeeper')

const apiUserAuth = (req, res, next) => {
    const token = req.cookies['udayy-calendar'];
    if (token) {
        const data = jwt.verify(token, process.env.JWT_TOKEN);
        if (data.email) {
            req['user'] = data
        }
        next()
    } else {
        return GATEKEEPER.unAuthorizedResponse(res)
    }
}

module.exports = apiUserAuth;
