const express = require("express")

const ExcerciseController = require("../controllers/Excercise")
const api = express.Router()

api.post("/create-excercise", ExcerciseController.createExcercise)
api.get("/get-excercises", ExcerciseController.getExcercises)
api.get("/get-random-excercise", ExcerciseController.getRandomExcercise)
api.post("/delete-excercise/:id", ExcerciseController.deleteExcercise)
api.get("/get-excercise", ExcerciseController.getExcerciseById)
api.put("/update-excercise/:id", ExcerciseController.updateExcercise)

module.exports = api