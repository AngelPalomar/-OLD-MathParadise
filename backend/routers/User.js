const express = require("express")
const UserController = require("../controllers/User")

const api = express.Router()

api.post("/sign-up", UserController.signUp)
api.post("/login", UserController.login)

module.exports = api 