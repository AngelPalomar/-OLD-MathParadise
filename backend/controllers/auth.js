const jwt = require('../services/jwt')
const moment = require('moment')
const User = require('../models/User')

function willExpireToken(token) {
    const { exp } = jwt.decodedToken(token)
    const currentDate = moment().unix()

    if (currentDate > exp) {
        return true
    }
    return false
}

function updateAccessToken(req, res) {
    const { refreshToken } = req.body
    const istokenExpired = willExpireToken(refreshToken)

    if (istokenExpired) {
        res.status(404).send({ message: 'El token de actualización ha expirado.' })
    } else {
        const { id } = jwt.decodedToken(refreshToken)

        User.findOne({ _id: id }, (err, userStored) => {
            if (err) {
                res.status(500).send({ message: 'Error del servidor.' })
            } else {
                if (!userStored) {
                    res.status(404).send({ message: 'Usuario no encontrado.' })
                } else {
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStored),
                        refreshToken: refreshToken
                    })
                }
            }
        })
    }
}

module.exports = {
    updateAccessToken
}