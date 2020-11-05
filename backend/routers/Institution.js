const express = require("express")

const InstitutionController = require('../controllers/Institution')
const api = express.Router()

api.post("/create-institution", InstitutionController.createInstitution)
api.get("/get-institutions", InstitutionController.getInstitutions)
api.put("/update-institution/:id", InstitutionController.updateInstitution)
api.post("/delete-institution/:id", InstitutionController.deleteInstitution)

module.exports = api