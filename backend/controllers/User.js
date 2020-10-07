const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt")
const User = require("../models/User")

function signUp(req, res) {
    const user = new User()

    const { name, lastname, nickname, email, password, role, repeatPassword } = req.body
    user.name = name.trim()
    user.lastname = lastname.trim()
    user.nickname = nickname.trim()
    user.email = email.trim()
    user.role = role
    user.active = true
    user.classic.points = 0
    user.classic.excercices = 0
    user.classic.right_excercises = 0
    user.classic.mistakes = 0
    user.classic.victories = 0
    user.classic.defeats = 0
    user.arcade.points = 0
    user.arcade.excercices = 0
    user.arcade.right_excercises = 0
    user.arcade.mistakes = 0
    user.arcade.victories = 0
    user.arcade.defeats = 0
    user.rush.points = 0
    user.rush.excercises = 0
    user.rush.level = 1
    user.rush.multiplier = 1

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
    const id = params.id

    User.findOne({ _id: id }, (err, user) => {
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

function updateUser(req, res) {
    const userData = req.body
    const params = req.params

    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor." })
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: "El usuario no existe." })
            } else {
                res.status(200).send({ message: "Los datos del usuario se han actualizado correctamente." })
            }
        }
    })
}

module.exports = {
    signUp,
    login,
    getUser,
    updateUser
}