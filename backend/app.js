const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const { API_VERSION } = require('./config')

//Load Routing

const UserRoutes = require('./routers/User')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configure head HTTP
//...

/**Router basix */
app.use(`/api/${API_VERSION}`, UserRoutes)

module.exports = app;
