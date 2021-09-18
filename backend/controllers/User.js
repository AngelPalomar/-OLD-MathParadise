const bcrypt = require("bcrypt-nodejs")
const jwt = require("../services/jwt")
const User = require("../models/User")
//File system
const fs = require('fs')
const path = require('path')

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
    user.avatar = 'default.svg'
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

function createUser(req, res) {
    const user = new User()

    const { name, lastname, nickname, email, password, role, institution, school_grade } = req.body

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

    bcrypt.hash(password, null, null, (err, hash) => {
        if (err) {
            res.status(500).send({ message: "Error al encriptar." })
        } else {
            //Encripta
            user.password = hash

            //Guarda el usuario
            user.save((err, result) => {
                if (err) {
                    res.status(500).send({
                        status: 0,
                        message: "Este usuario ya existe."
                    })
                } else {
                    if (!result) {
                        res.status(404).send({
                            status: 0,
                            message: "Error al crear el usuario"
                        })
                    } else {
                        res.status(200).send({
                            status: 1,
                            message: "Usuario creado correctamente",
                            user: result
                        })
                    }
                }
            })
        }
    })
}

async function updateFullUser(req, res) {
    let userData = req.body;
    userData.email = req.body.email.toLowerCase();
    const params = req.params;

    if (userData.password != "") {
        await bcrypt.hash(userData.password, null, null, (err, hash) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Error al encriptar la contraseña." });
            } else {
                userData.password = hash;
            }
        });
    } else {
        delete userData.password
    }

    User.findByIdAndUpdate({ _id: params.id }, userData, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." });
        } else {
            if (!userUpdate) {
                res
                    .status(404)
                    .send({ status: 0, message: "No se ha encontrado ningun usuario." });
            } else {
                res.status(200).send({ status: 1, message: "Usuario actualizado correctamente." });
            }
        }
    });
}

function updatePassword(req, res) {
    const params = req.params
    const { password, repeatPassword, oldPassword } = req.body

    if (!password || !repeatPassword) {
        res.status(500).send({ status: 0, message: "Las contraseñas son requeridas" })
        return
    }

    if (password !== repeatPassword) {
        res.status(500).send({ status: 0, message: "Las contraseñas deben ser iguales" })
        return
    }

    User.findByIdAndUpdate({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(404).send({ status: 0, message: "Error del servidor" })
        } else {
            if (!userData) {
                res.status(404).send({ status: 0, message: "Usuario no encontrado" })
            } else {
                bcrypt.compare(oldPassword, userData.password, (err, check) => {
                    if (err) {
                        res.status(500).send({ status: 0, message: "Error del servidor" })
                    } else if (!check) {
                        res.status(400).send({ status: 0, message: "La contraseña es incorrecta" })
                    } else {
                        //Una vez que se haya ingresado la contraseña, las actualiza
                        bcrypt.hash(password, null, null, (err, hash) => {
                            if (err) {
                                res.status(500).send({ status: 0, message: "Error al encriptar" })
                            } else {
                                User.findByIdAndUpdate(
                                    params.id,
                                    { password: hash },
                                    (err, result) => {
                                        if (err) {
                                            res.status(500).send({ status: 0, message: "Error del servidor" })
                                        } else {
                                            if (!result) {
                                                res.status(404).send({ status: 0, message: "Error al actualizar la contraseña" })
                                            } else {
                                                res.status(200).send({ status: 1, message: "Contraseña actualizada correctamente" })
                                            }
                                        }
                                    }
                                )
                            }
                        })
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
                    res.status(200).send({ user })
                }
            }
        })
}

function getUserById(req, res) {
    const params = req.params

    User.findById({ _id: params.id },
        { password: 0 },
        (err, user) => {
            if (err) {
                res.status(500).send({ message: "Error del servidor" })
            } else {
                if (!user) {
                    res.status(404).send({ message: "No se ha encontrado a ningun usuario." })
                } else {
                    res.status(200).send({ user })
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

function uploadAvatar(req, res) {
    const params = req.params

    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error en el servidor." })
        } else {
            if (!userData) {
                res.status(404).send({ status: 0, message: "No se ha encontrado el usuario." })
            } else {
                //Guardamos la info del usuario
                let user = userData

                if (req.files) {
                    let filePath = req.files.avatar.path
                    //separamos el string del path
                    let fileSplit = filePath.split("\\")
                    //Obtenemos la posición dos del arreglo
                    let fileName = fileSplit[2]
                    //Separamos el string por puntos
                    let extSplit = fileName.split(".")
                    //Extención
                    let fileExt = extSplit[1]

                    //Si la extension no es valida
                    if (fileExt !== 'png' && fileExt !== 'jpg') {
                        res.status(400).send({
                            status: 0,
                            message: "Archivo no permitido (solo: png/jpg)."
                        })
                    } else {
                        //Actualizar el usaurios
                        user.avatar = fileName
                        User.findByIdAndUpdate({ _id: params.id }, user, (err, result) => {
                            if (err) {
                                res.status(500).send({
                                    status: 0,
                                    message: "Error del servidor."
                                })
                            } else {
                                if (!result) {
                                    res.status(404).send({
                                        status: 0,
                                        message: "No se pudo actualizar el usuario."
                                    })
                                } else {
                                    res.status(200).send({
                                        status: 1,
                                        message: "Usuario modificado.",
                                        user: result,
                                        avatarName: fileName
                                    })
                                }
                            }
                        })
                    }
                }
            }
        }
    })
}

function getAvatar(req, res) {
    const avatarName = req.params.avatarName
    const filePath = `./uploads/avatar/${avatarName}`

    fs.exists(filePath, exists => {
        if (!exists) {
            res.status(200).send({
                status: 0,
                message: "El archivo no existe"
            })
        } else {
            res.status(200).sendFile(path.resolve(filePath))
        }
    })
}

function getRushLeaderboard(req, res) {
    User.find({ role: 'student', active: true }).sort({ "rush.points": -1 })
        .select("-email -role -active -sign_up_date -school_grade -password -arcade -classic -__v")
        .limit(10)
        .exec((err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Error al obtener la clasificación.", error: err })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "Sin clasificaciones" })
                } else {
                    res.status(200).send({
                        status: 1,
                        message: "Mostrando clasificación.",
                        rush_board: result
                    })
                }
            }
        })
}

function getClassicLeaderboard(req, res) {
    User.find({ role: 'student', active: true }).sort({ "classic.points": -1 })
        .select("-email -role -active -sign_up_date -school_grade -password -arcade -rush -__v")
        .limit(10)
        .exec((err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Error al obtener la clasificación.", error: err })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "Sin clasificaciones" })
                } else {
                    res.status(200).send({
                        status: 1,
                        message: "Mostrando clasificación.",
                        classic_board: result
                    })
                }
            }
        })
}

function getArcadeLeaderboard(req, res) {
    User.find({ role: 'student', active: true }).sort({ "arcade.points": -1 })
        .select("-email -role -active -sign_up_date -school_grade -password -classic -rush -__v")
        .limit(10)
        .exec((err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Error al obtener la clasificación.", error: err })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "Sin clasificaciones" })
                } else {
                    res.status(200).send({
                        status: 1,
                        message: "Mostrando clasificación.",
                        arcade_board: result
                    })
                }
            }
        })
}

function deleteUser(req, res) {
    const params = req.params

    User.findByIdAndDelete({ _id: params.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor" })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "Error al eliminar" })
            } else {
                res.status(200).send({ status: 1, message: "Usuario eliminado correctamente" })
            }
        }
    })
}

module.exports = {
    signUp,
    login,
    createUser,
    updatePassword,
    updateFullUser,
    getUser,
    getUserByNickname,
    getUserById,
    getAllUsers,
    updateUser,
    getRushLeaderboard,
    getClassicLeaderboard,
    getArcadeLeaderboard,
    uploadAvatar,
    getAvatar,
    deleteUser
}