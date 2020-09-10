const express = require("express")
const UserController = require("../controllers/User")

const api = express.Router()

api.post("/sign-up", UserController.signUp)
api.post("/login", UserController.login)
api.post("/get-user", UserController.getUser)

module.exports = api 