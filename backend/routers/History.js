const express = require("express")
const multipart = require("connect-multiparty")

const HistoryController = require('../controllers/History')
const api = express.Router()

api.post("/history", HistoryController.CreateHistory)
api.get("/history/:nickname", HistoryController.GetHistoryByNickname)

module.exports = api