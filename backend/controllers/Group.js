var randomToken = require('random-token')
    .create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
const { updateOne } = require('../models/Group');
const Group = require('../models/Group')

function createGroup(req, res) {
    const group = new Group();

    const { name, description, creator } = req.body

    /**
     * Cantidad de grupos disponibles con 8 dígitos en el código de acceso
     * 
     * == 3,381,098,545 ==
     */
    group.access_code = randomToken(8)
    group.name = name
    group.description = description
    group.creator = creator
    group.members = []

    group.save((err, groupStored) => {
        if (err) {
            res.status(500).send({ message: 'Error del servidor.', err })
        } else {
            if (!groupStored) {
                res.status(404).send({ message: 'Error al crear el grupo, vuelva a intentarlo', err })
            } else {
                res.status(200).send({ group: groupStored })
            }
        }
    })
}

function addMember(req, res) {
    const { id, members } = req.body

    Group.updateOne(
        { _id: id },
        { $addToSet: { members: members } }, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error del servidor.', err })
            } else {
                if (!data) {
                    res.status(404).send({ message: 'No se pudo completar esta acción.', result: data })
                } else {
                    res.status(200).send({ message: 'Miembros añadidos correctamente', result: data })
                }
            }
        }
    )
}

function deleteMember(req, res) {
    const { id, members } = req.body

    Group.updateOne(
        { _id: id },
        { $pull: { members: { $in: members } } }, (err, data) => {
            if (err) {
                res.status(500).send({ message: 'Error del servidor.', err })
            } else {
                if (!data) {
                    res.status(404).send({ message: 'No se pudo completar esta acción.', result: data })
                } else {
                    res.status(200).send({ message: 'Miembros eliminados correctamente', result: data })
                }
            }
        }
    ).exec()
}

module.exports = {
    createGroup,
    addMember,
    deleteMember
}