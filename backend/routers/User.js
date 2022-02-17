const express = require("express")
const multipart = require("connect-multiparty")
//middlewares
const md_auth = require('../middleware/authenticated')
const md_upload_avatar = multipart({
    uploadDir: './uploads/avatar'
})

const UserController = require("../controllers/User")
const api = express.Router()

api.post("/sign-up", UserController.signUp)
api.post("/login", UserController.login)
api.post("/create-user", UserController.createUser)
api.put("/update-password/:id", UserController.updatePassword)
api.post("/create-token", UserController.createToken)
api.post("/password-reset", UserController.passwordReset)
api.put("/update-full-user/:id", UserController.updateFullUser)
api.post("/get-user/:id", [md_auth.ensureAuth], UserController.getUser)
api.post("/get-user-nickname/:nickname", UserController.getUserByNickname)
api.get("/get-user-id/:id", UserController.getUserById)
api.get("/get-all-users", UserController.getAllUsers)
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser)
api.get("/get-rush-leaderboard", [md_auth.ensureAuth], UserController.getRushLeaderboard)
api.get("/get-classic-leaderboard", [md_auth.ensureAuth], UserController.getClassicLeaderboard)
api.get("/get-arcade-leaderboard", [md_auth.ensureAuth], UserController.getArcadeLeaderboard)
api.put("/upload-avatar/:id", [md_upload_avatar], UserController.uploadAvatar)
api.get("/get-avatar/:avatarName", UserController.getAvatar)
api.post("/delete-user/:id", UserController.deleteUser)

module.exports = api