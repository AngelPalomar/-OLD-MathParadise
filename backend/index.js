const mongoose = require('mongoose');
const app = require('./app')
const { API_VERSION, IP_SERVER, PORT_DB, PORT_SERVER } = require('./config')

mongoose.set("useFindAndModify", false)

/**
 * Intercambiar comentario de conexión para
 * cambiar de desarrollo a produccción
 */

mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/mathparadise`,
    //`mongodb+srv://math_admin:math_sedrftg892020-@cluster0.po59i.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
        if (err) {
            throw err
        } else {
            console.log('Conexión exitosa.')
            app.listen(PORT_SERVER, () => {
                console.log('############################################')
                console.log('########## MATH PARADISE API REST ##########')
                console.log('############################################')
                console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
            })
        }
    }
)
