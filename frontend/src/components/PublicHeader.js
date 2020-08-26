import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button, AppBar, Toolbar, Container
} from '@material-ui/core'

//import HomeIcon from '@material-ui/icons/Home';

import Logo from './Logo'
import logoSource from '../assets/images/logos/MathParadiseLogo.svg'

const useStyles = makeStyles((theme) => ({
    title: {
        flex: 1,
        padding: theme.spacing(0)
    },
    logo: {
        width: '28vh'
    },
    colorLabels: {
        color: '#616161'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary,
        }
    },
    appBar: {
        display: 'block',
    },
}));

function PublicHeader() {
    const classes = useStyles();

    return (
        <AppBar position="static" color="inherit" width={1} className={classes.appBar}>
            <Toolbar>
                <Container className={classes.title}>
                    <Link to="/" className={classes.link}>
                        <Logo src={logoSource} className={classes.logo} />
                    </Link>
                </Container>
                <Link to="/login" className={classes.link}>
                    <Button color="inherit" className={classes.colorLabels}>Ingresar</Button>
                </Link>
                <Link to="/sign-up" className={classes.link}>
                    <Button color="inherit" className={classes.colorLabels}>Registrarse</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default PublicHeader
