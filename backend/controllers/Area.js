const Area = require('../models/Area')

function createArea(req, res) {
    const area = new Area()
    const { name, active } = req.body
    area.name = name.trim()
    area.active = active

    if (name === "") {
        res.status(404).send({ status: 0, message: "No se permiten valores vacíos." })
    } else {
        area.save((err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "Esta área ya existe." })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "No se pudo guardar el área." })
                } else {
                    res.status(200).send({
                        status: 1,
                        message: "Area guardada correctamente",
                        area: result
                    })
                }
            }
        })
    }

}

function deleteArea(req, res) {
    const params = req.params

    Area.deleteOne({ _id: params.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Esta area no existe." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se pudo eliminar el área." })
            } else {
                res.status(200).send({ status: 1, message: "El área ha sido eliminada correctamente." })
            }
        }
    })
}

function updateArea(req, res) {
    const params = req.params
    const areaData = req.body

    if (areaData.name === "") {
        res.status(500).send({ status: 0, message: "No se permiten valores vacíos." })
    } else {
        Area.findOneAndUpdate({ _id: params.id }, areaData, (err, result) => {
            if (err) {
                res.status(500).send({ status: 0, message: "No se permiten valores vacíos." })
            } else {
                if (!result) {
                    res.status(404).send({ status: 0, message: "No se pudo modificar el area." })
                } else {
                    res.status(200).send({ status: 1, message: "El área ha sido modificada correctamente." })
                }
            }
        })
    }
}

function getAreas(req, res) {
    let query = req.query

    Area.aggregate([{ $match: query }, { $sort: { name: -1 } }], (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se encontraron areas." })
            } else {
                res.status(200).send({
                    status: 1,
                    areas: result
                })
            }
        }
    })
}

function getAreaById(req, res) {
    const query = req.query

    Area.findOne({ _id: query.id }, (err, result) => {
        if (err) {
            res.status(500).send({ status: 0, message: "Error del servidor." })
        } else {
            if (!result) {
                res.status(404).send({ status: 0, message: "No se encontraron areas." })
            } else {
                res.status(200).send({
                    status: 1,
                    area: result
                })
            }
        }
    })
}

module.exports = {
    createArea,
    deleteArea,
    updateArea,
    getAreas,
    getAreaById
}