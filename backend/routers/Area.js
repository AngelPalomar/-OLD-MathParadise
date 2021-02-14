const express = require("express")
const md_auth = require('../middleware/authenticated')

const AreaController = require("../controllers/Area")
const api = express.Router()

api.post("/create-area", [md_auth.ensureAuth], AreaController.createArea)
api.post("/delete-area/:id", [md_auth.ensureAuth], AreaController.deleteArea)
api.put("/update-area/:id", [md_auth.ensureAuth], AreaController.updateArea)
api.get("/get-areas", [md_auth.ensureAuth], AreaController.getAreas)
api.get("/get-area", AreaController.getAreaById)

module.exports = api