import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

/**Componentes */
import PublicHeader from '../components/PublicHeader'
import Footer from '../components/Footer'

/**Imágenes */
import banner1 from '../assets/images/banners/banner1.svg'
import banner2 from '../assets/images/banners/banner2.svg'
import banner3 from '../assets/images/banners/banner3.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(5),
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
        marginTop: theme.spacing(10),
    },
    titles: {
        color: '#2A55FF',
        textAlign: 'center'
    },
    banners: {
        [theme.breakpoints.up('xs')]: {
            width: '95%'
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
        <>
            <PublicHeader />
            <Grid container>
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
                            <Link to="/login" className={classes.link}>
                                <Button className={classes.button} variant="contained">Iniciar sesión</Button>
                            </Link>
                            <Link to="/sign-up" className={classes.link}>
                                <Button className={classes.button} variant="contained">Crear una cuenta</Button>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box className={classes.root}>
                <Box className={classes.bannerContainer}>
                    <img src={banner2} alt="banner2" className={classes.banners} />
                </Box>
            </Box>

            <Box className={classes.root}>
                <Box className={classes.bannerContainer}>
                    <img src={banner3} alt="banner3" className={classes.banners} />
                </Box>
            </Box>

            <Footer />
        </>
    )
}

export default Home
