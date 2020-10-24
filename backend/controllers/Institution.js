const Institution = require('../models/Institution');

function createInstitution(req, res) {
    const institution = new Institution()

    const { name, abbrev, type, city, country } = req.body

    institution.name = name
    institution.abbrev = abbrev
    institution.type = type
    institution.city = city
    institution.country = country

    institution.save((err, institutionStored) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!institutionStored) {
                res.status(404).send({ status: 0, message: "No se pudo guardar la institución." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Institución guardada correctamente.",
                    institution: institutionStored
                })
            }
        }
    })
}

function getInstitutions(req, res) {
    Institution.aggregate([{ $sort: { name: 1 } }], (err, institution) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!institution) {
                res.status(404).send({ status: 0, message: "No se pudo guardar la institución." })
            } else {
                res.status(200).send({ status: 1, institution })
            }
        }
    })
}

module.exports = {
    createInstitution,
    getInstitutions
}