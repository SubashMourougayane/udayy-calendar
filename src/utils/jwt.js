const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.generateToken = (data) => {

    return JWT.sign(data, process.env.JWT_TOKEN);
}



module.exports.verifyToken = (token) => {
    var decoded = JWT.verify(token, process.env.JWT_TOKEN);

    return decoded;
}