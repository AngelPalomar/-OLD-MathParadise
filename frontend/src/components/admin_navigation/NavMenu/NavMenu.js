import React from "react";
import { Link } from 'react-router-dom'
import { Drawer } from "@material-ui/core";
import useStyles from "./useStyles";

//Components
import MenuList from "../MenuList"
import Logo from "../../Logo"

function NavMenu(props) {
    const classes = useStyles();

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
                    <Link to="/admin">
                        <Logo className={classes.logoSize} />
                    </Link>
                </div>
            </div>
            <MenuList url={props.url} />
        </Drawer>
    );
}

export default NavMenu;