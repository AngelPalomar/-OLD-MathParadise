const Subtopic = require('../models/Subtopic')

function createSubtopic(req, res) {
    const subtopic = new Subtopic()
    const { name, topic, displayLabel, symbol, primaryColor, secondaryColor } = req.body

    subtopic.name = name
    subtopic.topic = topic
    subtopic.displayLabel = displayLabel
    subtopic.symbol = symbol
    subtopic.primaryColor = primaryColor
    subtopic.secondaryColor = secondaryColor

    subtopic.save((err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor", error: err })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se pudo añadir el subtema." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Tema añadido correctamente.",
                    subtopic: result
                })
            }
        }
    })
}

function deleteSubtopic(req, res) {
    const params = req.params

    Subtopic.deleteOne({ _id: params.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor.", error: err })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se pudo eliminar el subtema." })
            } else {
                res.status(200).send({ status: 1, message: "Subtema eliminado correctamente" })
            }
        }
    })
}

function updateSubtopic(req, res) {
    const params = req.params
    const subtopicData = req.body

    Subtopic.findOneAndUpdate({ _id: params.id }, subtopicData, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor.", error: err })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se pudo modificar el subtema." })
            } else {
                res.status(200).send({ status: 1, message: "Subtema modificado correctamente" })
            }
        }
    })
}

function getSubtopics(req, res) {
    Subtopic.aggregate([{ $sort: { name: 1 } }], (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se encontraron subtemas." })
            } else {
                res.status(200).send({
                    status: 1,
                    subtopics: result
                })
            }
        }
    })
}

module.exports = {
    createSubtopic,
    deleteSubtopic,
    updateSubtopic,
    getSubtopics
}