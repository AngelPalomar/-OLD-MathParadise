import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

/**Utils */
import { getVersionNumber } from '../utils/Version'

/**Imagenes */
import math_logo from '../assets/images/logos/MathParadiseLogo.svg'
import uteq_logo from '../assets/images/logos/uteq_logo.svg'

const useStyles = makeStyles((theme) => ({

    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
        width: '100%',
        background: '#FFF',
        color: theme.palette.primary.main
    },
    logos: {
        [theme.breakpoints.up('xs')]: {
            width: '25%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '15%'
        },
        [theme.breakpoints.up('md')]: {
            width: '15%'
        },
        [theme.breakpoints.up('lg')]: {
            width: '10%'
        },
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    logosContainer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(1)
    },
    rights: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(1)
    },
    contactContainer: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            marginTop: theme.spacing(2)
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right',
        }
    },
    link: {
        textDecoration: 'none',
        color: '#00487C',
        '&:hover': {
            color: '#00487C'
        }
    }
}))

function Footer() {
    const classes = useStyles()
    return (
        <Box className={classes.root} boxShadow={4}>
            <Box className={classes.logosContainer}>
                <img src={math_logo} alt="math_logo.svg" className={classes.logos} />
                <img src={uteq_logo} alt="uteq_logo.svg" className={classes.logos} />
            </Box>
            <Grid container>
                <Grid item lg={2} md={2} sm={6} xs={6}>
                    <Typography variant="h6" className={classes.title}>Social</Typography>
                    <a href="https://www.facebook.com/Math-Paradise-2132810540284835" target="_blank" rel="noopener noreferrer" className={classes.link}>Facebook</a>
                    <br />
                    <a href="https://www.instagram.com/mathparadise.juega/" target="_blank" rel="noopener noreferrer" className={classes.link}>Instagram</a>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                    <Typography variant="h6" className={classes.title}>Más información</Typography>
                    <a href="http://www.uteq.edu.mx/" target="_blank" rel="noopener noreferrer" className={classes.link}>
                        Universidad Tecnológica de Querétaro
                    </a>
                    <br />
                    <a href="/privacy-policies" className={classes.link}>
                        Políticas de privacidad
                    </a>
                </Grid>
                <Grid item lg={7} md={7} sm={12} xs={12} className={classes.contactContainer}>
                    <Typography variant="h6" className={classes.title}>Contacto</Typography>
                    <a href="mailto:mathparadise.juega@gmail.com" rel="noopener noreferrer" className={classes.link}>
                        Feedback
                    </a>
                </Grid>
            </Grid>

            <Box className={classes.rights}>
                <Typography>Math Paradise&reg; {getVersionNumber()} - Todos los derechos reservados</Typography>
                <Typography>2020</Typography>
            </Box>
        </Box>
    )
}

export default Footer