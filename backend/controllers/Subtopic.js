const Subtopic = require('../models/Subtopic')

function createSubtopic(req, res) {
    const subtopic = new Subtopic()
    const { name, topic, area, displayLabel, symbol, active } = req.body

    subtopic.name = name
    subtopic.topic = topic
    subtopic.area = area
    subtopic.displayLabel = displayLabel.toUpperCase()
    subtopic.symbol = symbol
    subtopic.active = active

    subtopic.save((err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Este subtema ya existe.", error: err })
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
    const query = req.query

    Subtopic.aggregate([{ $match: query }, { $sort: { name: 1 } }], (err, result) => {
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

/**Esta función trae 13 subtemas aleatorios para ser repartidos entre 26 casillas */
function getDefaultClassicBoard(req, res) {
    const query = req.query

    Subtopic.aggregate([{ $match: { ...query, active: true } }, { $sample: { size: 13 } }], (err, board) => {
        if (err) {
            res.status(500).send({
                status: 0,
                message: 'Error del servidor.'
            })
        } else {
            if (!board) {
                res.status(404).send({
                    status: 0,
                    message: 'No se pudo generar el tablero.'
                })
            } else {
                res.status(200).send({
                    status: 1,
                    message: 'Temas para tablero clásico generados.',
                    board: board
                })
            }
        }
    })
}

function getSubtopicById(req, res) {
    const query = req.query

    Subtopic.findOne({ _id: query.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se encontraron subtemas." })
            } else {
                res.status(200).send({
                    status: 1,
                    subtopic: result
                })
            }
        }
    })
}

module.exports = {
    createSubtopic,
    deleteSubtopic,
    updateSubtopic,
    getSubtopics,
    getSubtopicById,
    getDefaultClassicBoard
}