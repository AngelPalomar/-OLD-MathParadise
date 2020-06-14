import React from 'react'

import { makeStyles, Drawer } from "@material-ui/core";
import MenuList from './MenuList';
import Logo from './Logo';
import logoSource from '../assets/images/logos/MathParadiseLogo.svg'

const drawerWidth = 240
const useStyle = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    logo: {
        textAlign: "center",
        marginTop: theme.spacing(1.3)
    }
}))

function NavMenu(props) {

    const classes = useStyle();

    return (
        <Drawer className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}
            anchor="left">

            <div className={classes.toolbar}>
                <div className={classes.logo}>
                    <Logo src={logoSource} width="75%" />
                </div>
            </div>
            <MenuList />

        </Drawer>
    )
}

export default NavMenu
