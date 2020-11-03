import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

/**Componentes */
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        textAlign: 'justify'
    },
    p: {
        marginTop: theme.spacing(2)
    },
    footer: {
        position: 'relative'
    }
}))

function PrivacyPolicies() {
    const classes = useStyles()

    return (
        <>
            <PublicHeader />
            <div className={classes.root}>
                <Typography variant="h5">Políticas de privacidad</Typography>
                <Typography className={classes.p}>
                    Math Paradise tiene el compromiso de resguardar fuertemente de su privacidad, todo como
                    objetivo proveer un ambiente seguro para nuestros usuarios como usted.
                </Typography>
                <br />
                <Typography variant="h6">¿Qué información recabamos?</Typography>
                <Typography className={classes.p}>
                    Math Paradise recauda a través de la aplicación los datos personales como el nombre completo
                    del usuario, un alias o nombre de juego (nickname, nombre de usuario, nombre de juego),
                    así como la dirección de correo electrónico para proporcionarle al usuario un medio de acceso
                    y disposición de sus datos.
                </Typography>
                <br />
                <Typography>
                    Al estar Math Paradise orientado a un público educativo, también se recauda el nombre de la
                    institución donde lleva a cabo sus actividades académicas, mismos datos que las instituciones
                    proveen a la aplicación; además se guarda el grado escolar del usuario y el rol que desempeña
                    dentro de su ámbito educativo.
                </Typography>
                <br />
                <Typography variant="h6">Principios</Typography>
                <Typography className={classes.p}>
                    Math Paradise se compromete a no vender a terceros que no sean instituciones educativas o
                    centros de investigación la información personal de ningún usuario; nuestro objetivo es
                    proveer de una herramienta segura a los facilitadores de la educación y, sobre todo a los
                    estudiantes.
                </Typography>
                <br />
                <Typography>
                    Math Paradise se compromete a ofrecer el control total sobre tu información que nos has dado,
                    así como la suficiente protección de los mismos hacia el exterior.
                </Typography>
            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default PrivacyPolicies
