const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const { API_VERSION } = require('./config')

//Load Routing
//...

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configure head HTTP
//...

//Basic routes
//...

module.exports = app;
