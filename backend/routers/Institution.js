const express = require("express")

const InstitutionController = require('../controllers/Institution')
const api = express.Router()

api.post("/create-institution", InstitutionController.createInstitution)
api.get("/get-institutions", InstitutionController.getInstitutions)
api.get("/get-institution-by-id/:id", InstitutionController.getInstitutionById)
api.put("/update-institution/:id", InstitutionController.updateInstitution)
api.delete("/delete-institution/:id", InstitutionController.deleteInstitution)

module.exports = api