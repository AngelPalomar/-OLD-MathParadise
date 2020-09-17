const express = require("express")
const multipart = require("connect-multiparty")
const md_auth = require('../middleware/authenticated')

const UserController = require("../controllers/User")
const api = express.Router()

api.post("/sign-up", UserController.signUp)
api.post("/login", UserController.login)
api.post("/get-user", [md_auth.ensureAuth], UserController.getUser)
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser)

module.exports = api 