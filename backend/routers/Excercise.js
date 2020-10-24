const express = require("express")

const ExcerciseController = require("../controllers/Excercise")
const api = express.Router()

api.post("/create-excercise", ExcerciseController.createExcercise)
api.get("/get-excercises", ExcerciseController.getExcercises)
api.get("/get-random-excercise", ExcerciseController.getRandomExcercise)

module.exports = api