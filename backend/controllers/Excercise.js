const Excercise = require('../models/Excercise')

function createExcercise(req, res) {
    const excercise = new Excercise()

    const { label, option_a, option_b, option_c, option_d,
        answer, area, subtopic, topic, difficulty } = req.body

    excercise.label = label
    excercise.option_a = option_a
    excercise.option_b = option_b
    excercise.option_c = option_d
    excercise.option_d = option_c
    excercise.answer = answer
    excercise.area = area
    excercise.topic = topic
    excercise.subtopic = subtopic
    excercise.difficulty = difficulty

    excercise.save((err, ExcerciseStored) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Este ejercicio ya existe, escriba un ejercicio diferente.", err })
        } else {
            if (!ExcerciseStored) {
                res.status(404).send({ status: 0, message: 'No se pudo guardar el ejercicio, vuelva a intentarlo.', err })
            } else {
                res.status(200).send({
                    status: 1,
                    message: 'Ejercicio guardado correctamente.',
                    excercise: ExcerciseStored
                })
            }
        }
    })
}

function getExcercises(req, res) {
    const query = req.query

    Excercise.find(query, (err, excercises) => {
        if (err) {
            res.status(500).send({
                status: 0,
                message: 'Error del servidor.'
            })
        } else {
            if (!excercises) {
                res.status(404).send({
                    status: 0,
                    message: 'No se encontraron ejercicios.'
                })
            } else {
                res.status(200).send({ excercises })
            }
        }
    })
}

function getRandomExcercise(req, res) {
    const query = req.query

    Excercise.aggregate([{ $match: query }, { $sample: { size: 1 } }], (err, excercise) => {
        if (err) {
            res.status(500).send({
                status: 0,
                message: 'Error del servidor.'
            })
        } else {
            if (!excercise) {
                res.status(404).send({
                    status: 0,
                    message: 'No se encontró ejercicio'
                })
            } else {
                res.status(200).send({ excercise })
            }
        }
    })
}


module.exports = {
    createExcercise,
    getExcercises,
    getRandomExcercise
}