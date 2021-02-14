const Topic = require('../models/Topic')

function createTopic(req, res) {
    const topic = new Topic()

    const { name, area, active } = req.body
    topic.name = name
    topic.area = area
    topic.active = active

    if (name === "" || area === "" || !name || !area) {
        res.status(500).send({ status: 0, message: "No se permiten campos vacíos." })
    } else {
        topic.save((err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Este tema ya existe." })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "No se pudo guardar el tema." })
                } else {
                    res.status(500).send({
                        status: 1,
                        message: "Tema guardado correctamente",
                        topic: result
                    })
                }
            }
        })
    }
}

function deleteTopic(req, res) {
    const params = req.params

    Topic.deleteOne({ _id: params.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Este tema no existe." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se pudo eliminar el tema." })
            } else {
                res.status(404).send({ status: 1, message: "Tema eliminado correctamente." })
            }
        }
    })
}

function updateTopic(req, res) {
    const params = req.params
    const topicData = req.body
    const { name, area } = topicData

    if (!name || !area || name === "" || area === "") {
        res.status(500).send({ status: 0, message: "No se permiten valores vacíos." })
    } else {
        Topic.findOneAndUpdate({ _id: params.id }, topicData, (err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Error del servidor." })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "No se pudo modificar el tema." })
                } else {
                    res.status(200).send({ status: 1, message: "Tema modificado correctamente." })
                }
            }
        })
    }
}

function getTopics(req, res) {
    const query = req.query

    Topic.aggregate([{ $match: query }, { $sort: { name: 1 } }], (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se encontraron areas." })
            } else {
                res.status(200).send({
                    status: 1,
                    topics: result
                })
            }
        }
    })
}

function getTopicById(req, res) {
    const query = req.query

    Topic.findOne({ _id: query.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se encontraron areas." })
            } else {
                res.status(200).send({
                    status: 1,
                    topic: result
                })
            }
        }
    })
}

module.exports = {
    createTopic,
    deleteTopic,
    updateTopic,
    getTopics,
    getTopicById
}