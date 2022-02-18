import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
    Button, AppBar, Toolbar, Container, Menu, MenuItem
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
        width: '185px',
    },
    colorLabels: {
        color: theme.palette.primary.main
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
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static" color="inherit" width={1} className={classes.appBar}>
            <Toolbar>
                <Container className={classes.title}>
                    <Link to="/" className={classes.link}>
                        <Logo src={logoSource} className={classes.logo} />
                    </Link>
                </Container>
                <Button onClick={handleMenu} className={classes.colorLabels}>
                    Acceder
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}>

                    <Link to={"/login"} className={classes.link}>
                        <MenuItem>Iniciar sesión</MenuItem>
                    </Link>
                    <Link to={"/sign-up"} className={classes.link}>
                        <MenuItem>Registrarse</MenuItem>
                    </Link>

                </Menu>

            </Toolbar>
        </AppBar>
    )
}

export default PublicHeader
