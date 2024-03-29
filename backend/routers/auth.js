const express = require('express')
const AuthController = require('../controllers/auth')

const api = express.Router()

api.post('/update-access-token', AuthController.updateAccessToken)

module.exports = api