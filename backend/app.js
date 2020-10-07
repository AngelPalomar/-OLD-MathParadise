const express = require("express")
const bodyParser = require("body-parser")

const app = express()

const { API_VERSION } = require('./config')

//Load Routing
const AuthRoutes = require('./routers/auth')
const UserRoutes = require('./routers/User')
const GroupRoutes = require('./routers/Group')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configure head HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    )
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE")
    next()
})

/**Router basic */
app.use(`/api/${API_VERSION}`, AuthRoutes)
app.use(`/api/${API_VERSION}`, UserRoutes)
app.use(`/api/${API_VERSION}`, GroupRoutes)

module.exports = app;
