const express = require("express")
const multipart = require("connect-multiparty")

const GameController = require('../controllers/Game')
const api = express.Router()

api.post("/create-game", GameController.createGame)
api.get("/get-game-pin", GameController.getGameByPin)
api.put("/join-game", GameController.joinGame)
api.put("/update-game", GameController.updateGame)

module.exports = api