const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt")
const User = require("../models/User")

function signUp(req, res) {
    const user = new User()

    const { name, lastname, nickname, email, password, role, institution, school_grade, repeatPassword } = req.body
    user.name = name.trim()
    user.lastname = lastname.trim()
    user.nickname = nickname.trim()
    user.email = email.trim()
    user.institution = institution
    user.school_grade = school_grade
    user.sign_up_date = new Date()
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
    const params = req.params

    User.findOne({ _id: params.id },
        { password: 0 },
        (err, user) => {
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

function getUserByNickname(req, res) {
    const params = req.params

    User.findOne({ nickname: params.nickname },
        { password: 0 },
        (err, user) => {
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

function getAllUsers(req, res) {
    User.find((err, users) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!users) {
                res.status(404).send({ message: "No hay usuarios." })
            } else {
                res.status(200).send({ users })
            }
        }
    }).select('-password -arcade -classic -rush -__v')
}

function updateUser(req, res) {
    const userData = req.body
    const params = req.params

    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ status: 0, message: "El correo o el alias ya existen, pruebe uno diferente." })
        } else {
            if (!userUpdated) {
                res.status(404).send({ status: 0, message: "Error al modificar el usuario." })
            } else {
                res.status(200).send({ status: 1, message: "Los datos se han actualizado correctamente." })
            }
        }
    })
}

module.exports = {
    signUp,
    login,
    getUser,
    getUserByNickname,
    getAllUsers,
    updateUser
}