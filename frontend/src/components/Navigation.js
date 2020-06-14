import React from 'react'

import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, IconButton, Button, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
    },
    title: {
        flexGrow: 2,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
}));
function Navigation(props) {
    const classes = useStyles()

    return (
        <AppBar className={classes.appBar} color="inherit">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit"
                    aria-label="menu" onClick={() => props.OpenAction()}>
                    <MenuIcon color="primary" />
                </IconButton>
                <Typography variant="h5" color="primary" className={classes.title}>Inicio</Typography>
                <Button color="inherit">Cerrar sesión</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
