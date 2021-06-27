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

function getInstitutionById(req, res) {
    const params = req.params

    Institution.findById(params.id, (err, institution) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!institution) {
                res.status(404).send({ status: 0, message: "No se pudo encontrar una institución." })
            } else {
                res.status(200).send({
                    status: 1,
                    institution: institution
                })
            }
        }
    })
}

function updateInstitution(req, res) {
    const InstitutionData = req.body
    const params = req.params

    Institution.findOneAndUpdate({ _id: params.id }, InstitutionData, (err, InstitutionStored) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!InstitutionStored) {
                res.status(404).send({ status: 0, message: "Error al modificar la institución." })
            } else {
                res.status(200).send({
                    status: 1,
                    message: "Los datos se han actualizado correctamente."
                })
            }
        }
    })
}

function deleteInstitution(req, res) {
    const params = req.params

    Institution.deleteOne({ _id: params.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "Error al eliminar la institución." })
            } else {
                res.status(200).send({ status: 1, message: "La institución ha sido eliminada correctamente." })
            }
        }
    })
}

module.exports = {
    createInstitution,
    getInstitutions,
    updateInstitution,
    deleteInstitution,
    getInstitutionById
}