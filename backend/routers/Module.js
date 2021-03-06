const express = require("express")
const md_auth = require('../middleware/authenticated')

const ModuleController = require("../controllers/Module")
const api = express.Router()

api.post("/create-module", ModuleController.createModule)
api.get("/get-modules", ModuleController.getModules)
api.get("/get-module", ModuleController.getModuleById)
api.put("/update-module", ModuleController.updateModule)
api.post("/delete-module", ModuleController.deleteModule)

module.exports = api