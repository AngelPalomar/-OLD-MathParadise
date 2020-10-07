const express = require("express")
const multipart = require("connect-multiparty")

const GroupController = require('../controllers/Group')
const api = express.Router()

api.post("/create-group", GroupController.createGroup)
api.post("/add-member", GroupController.addMember)
api.post("/delete-member", GroupController.deleteMember)

module.exports = api