import React, { useEffect, Fragment } from 'react'
import { Box, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

/**Componentes */
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

/**Imágenes */
import banner1 from '../assets/images/banners/banner1.svg'
import banner2 from '../assets/images/banners/banner2.svg'
import banner3 from '../assets/images/banners/banner3.svg'
import banner4 from '../assets/images/banners/banner4.svg'
import banner5 from '../assets/images/banners/banner5.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5),
    },
    welcome: {
        flexGrow: 1,
    },
    bannerContainer: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '50vh',
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        color: '#FFF',
        fontSize: '22px'
    },
    forms: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: theme.spacing(3),
    },
    titles: {
        color: '#2A55FF',
        textAlign: 'center'
    },
    banners: {
        [theme.breakpoints.down('sm')]: {
            width: '51vh'
        },
        [theme.breakpoints.up('md')]: {
            width: '85%'
        },
    },
    bannersOne: {
        [theme.breakpoints.up('xs')]: {
            width: '100%'
        },
        [theme.breakpoints.up('sm')]: {
            width: '90%'
        },
        [theme.breakpoints.up('md')]: {
            width: '85%'
        },
        [theme.breakpoints.up('lg')]: {
            width: '100vh'
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary,
        }
    },
}))

function Home() {
    const classes = useStyles()

    useEffect(() => {
        document.title = 'Math Paradise'
    }, [])

    return (
        <Fragment>
            <PublicHeader />
            <Grid container className={classes.welcome}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box className={classes.root}>
                        <Box className={classes.bannerContainer}>
                            <img src={banner1} alt="banner1" className={classes.banners} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Box className={classes.root}>
                        <Typography variant="h4" className={classes.titles}>¡Empieza a jugar!</Typography>

                        <Box className={classes.forms}>
                            <a href="/login" className={classes.link}>
                                <Button className={classes.button} variant="contained">Iniciar sesión</Button>
                            </a>
                            <a href="/sign-up" className={classes.link}>
                                <Button className={classes.button} variant="contained">Crear una cuenta</Button>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box className={classes.root}>
                <Box className={classes.bannerContainer}>
                    <img src={banner2} alt="banner2" className={classes.bannersOne} />
                </Box>
            </Box>

            <Box className={classes.root}>
                <Box className={classes.bannerContainer}>
                    <img src={banner4} alt="banner4" className={classes.bannersOne} />
                </Box>
            </Box>

            <Box className={classes.root}>
                <Box className={classes.bannerContainer}>
                    <img src={banner5} alt="banner5" className={classes.bannersOne} />
                </Box>
            </Box>

            <Box className={classes.root}>
                <Box className={classes.bannerContainer}>
                    <img src={banner3} alt="banner3" className={classes.bannersOne} />
                </Box>
            </Box>

            <Footer />
        </Fragment>
    )
}

export default Home
