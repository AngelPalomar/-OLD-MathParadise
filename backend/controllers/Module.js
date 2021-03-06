const Module = require('../models/Modules')

function createModule(req, res) {
    const _module = new Module()
    const { name, active } = req.body

    _module.name = name.trim()
    _module.active = active

    if (!name || active === "" || name === "") {
        res.status(500).send({ status: 0, message: "No se permiten valores vacíos." })
        return
    }

    //Creamos el módulo
    _module.save()
}

function getModules(req, res) {

}

function getModuleById(req, res) {

}

function updateModule(req, res) {

}

function deleteModule(req, res) {

}


module.exports = {
    createModule,
    getModules,
    getModuleById,
    updateModule,
    deleteModule
}