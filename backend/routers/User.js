const express = require("express")
const multipart = require("connect-multiparty")
const md_auth = require('../middleware/authenticated')

const UserController = require("../controllers/User")
const api = express.Router()

api.post("/sign-up", UserController.signUp)
api.post("/login", UserController.login)
api.post("/get-user/:id", [md_auth.ensureAuth], UserController.getUser)
api.post("/get-user-nickname/:nickname", UserController.getUserByNickname)
api.get("/get-all-users", UserController.getAllUsers)
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser)
api.get("/get-rush-leaderboard", [md_auth.ensureAuth], UserController.getRushLeaderboard)

module.exports = api 