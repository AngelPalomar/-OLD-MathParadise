const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt")
const User = require("../models/User")

function signUp(req, res) {
    const user = new User()

    const { name, lastname, nickname, email, password, role, repeatPassword } = req.body
    user.name = name
    user.lastname = lastname
    user.nickname = nickname
    user.email = email
    user.role = role
    user.active = true
    user.stats.classic.points = 0
    user.stats.classic.excercices = 0
    user.stats.classic.right_excercises = 0
    user.stats.classic.mistakes = 0
    user.stats.classic.victories = 0
    user.stats.classic.defeats = 0
    user.stats.arcade.points = 0
    user.stats.arcade.excercices = 0
    user.stats.arcade.right_excercises = 0
    user.stats.arcade.mistakes = 0
    user.stats.arcade.victories = 0
    user.stats.arcade.defeats = 0
    user.stats.rush.points = 0
    user.stats.rush.excercises = 0
    user.stats.rush.level = 0
    user.stats.rush.multiplier = 0

    if (!password || !repeatPassword) {
        res.status(404).send({ message: "Las contraseñas son obligatorias." })
    } else {
        if (password !== repeatPassword) {
            res.status(404).send({ message: "Las contraseñas no son iguales." })
        } else {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    res.status(500).send({ message: "Error al encriptar." })
                } else {
                    user.password = hash

                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: "Este usuario ya existe." })
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: "Error al crear el usuario." })
                            } else {
                                res.status(200).send({ user: userStored })
                            }
                        }
                    })
                }
            })
        }
    }
}

function login(req, res) {
    const params = req.body
    const email = params.email.toLowerCase()
    const password = params.password

    User.findOne({ email }, (err, userStored) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." })
        } else {
            if (!userStored) {
                res.status(404).send({ message: "Usuario no encontrado." })
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ message: "Error del servidor." })
                    } else if (!check) {
                        res.status(404).send({ message: "El correo o la contraseña son incorrectos." })
                    } else {
                        if (!userStored.active) {
                            res.status(200).send({ code: 200, message: "El usuario no está activo." })
                        } else {
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            })
                        }
                    }
                })
            }
        }
    })
}

function getUser(req, res) {
    const params = req.body
    const email = params.email

    User.findOne({ email }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!user) {
                res.status(404).send({ message: "No se ha encontrado a ningun usuario." })
            } else {
                if (!user.active) {
                    res.status(200).send({ code: 200, message: "El usuario no está activo." })
                } else {
                    res.status(200).send({ user })
                }
            }
        }
    })
}

module.exports = {
    signUp,
    login,
    getUser
}