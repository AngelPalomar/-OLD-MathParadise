const express = require("express")

const InstitutionController = require('../controllers/Institution')
const api = express.Router()

api.post("/create-institution", InstitutionController.createInstitution)
api.get("/get-institutions", InstitutionController.getInstitutions)

module.exports = api