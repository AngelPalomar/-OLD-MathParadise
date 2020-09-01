const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const { API_VERSION } = require('./config')

//Load Routing
const AuthRoutes = require('./routers/auth')
const UserRoutes = require('./routers/User')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configure head HTTP
//...

/**Router basic */
app.use(`/api/${API_VERSION}`, AuthRoutes)
app.use(`/api/${API_VERSION}`, UserRoutes)

module.exports = app;
