const jwt = require('jwt-simple')
const moment = require('moment')

const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"

/**Función que crea el access token */
exports.createAccessToken = function (user) {
    const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        createToken: moment().unix(),
        exp: moment().add(3,"hours").unix()
    }

    return jwt.encode(payload, SECRET_KEY)
}

/**Función que crea el refresh token */
exports.createRefreshToken = function (user) { 
    const payload = {
        id: user._id,
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payload, SECRET_KEY)
}

/**Función que descodifica el token */
exports.decodedToken = function (token) { 
    return jwt.decode(token, SECRET_KEY, true) 
}