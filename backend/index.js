const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3977
const { API_VERSION, IP_SERVER, PORT_DB } = require('./config')

mongoose.set("useFindAndModify", false)

mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/mathparadise`,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
        if (err) {
            throw err
        } else {
            console.log('Conexión exitosa.')
            app.listen(port, () => {
                console.log('############################################')
                console.log('########## MATH PARADISE API REST ##########')
                console.log('############################################')
                console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`)
            })
        }
    }
)
