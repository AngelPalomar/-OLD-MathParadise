import React from "react";
import { Link } from 'react-router-dom'
import { makeStyles, Drawer } from "@material-ui/core";
import MenuList from "./MenuList"
import Logo from "./Logo"

const drawerWidth = 240;
const useStyle = makeStyles((theme) => ({
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
        marginTop: theme.spacing(1.3),
    },
    logoSize: {
        width: '75%'
    }
}));

function NavMenu(props) {
    const classes = useStyle();

    return (
        <Drawer
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            variant={props.variant}
            open={props.open}
            onClose={props.onClose ? props.onClose : null}
            anchor="left"
        >
            <div className={classes.toolbar}>
                <div className={classes.logo}>
                    <Link to="/home">
                        <Logo className={classes.logoSize} />
                    </Link>
                </div>
            </div>
            <MenuList close={props.onClose} url={props.url} />
        </Drawer>
    );
}

export default NavMenu;