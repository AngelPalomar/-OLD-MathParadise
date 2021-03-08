const mongoose = require('mongoose');
const app = require('./app')
const port = process.env.PORT || 3978
const { API_VERSION, IP_SERVER, PORT_DB } = require('./config')

mongoose.set("useFindAndModify", false)

/**
 * Intercambiar comentario de conexión para
 * cambiar de desarrollo a produccción
 */

mongoose.connect(
    //`mongodb://${IP_SERVER}:${PORT_DB}/mathparadise`,
    `mongodb+srv://math_admin:math_sedrftg892020-@cluster0.po59i.mongodb.net/<dbname>?retryWrites=true&w=majority`,
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
