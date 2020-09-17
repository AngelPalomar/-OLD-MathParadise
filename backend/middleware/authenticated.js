const jwt = require('jwt-simple')
const moment = require('moment')

const SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Petición denegada.' })
    }

    const token = req.headers.authorization.replace(/['"]+/g, "")

    try {
        var payload = jwt.decode(token, SECRET_KEY)

        if (payload.exp <= moment.unix()) {
            return res.status(404).send({ message: 'El token ha expirado.' })
        }
    } catch (error) {
        return res.status(404).send({ message: 'El token es inválido.' })
    }

    req.user = payload
    next()
}