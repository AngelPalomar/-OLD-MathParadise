import React, { useState } from 'react'
import { makeStyles, Hidden } from "@material-ui/core"

/**Pantallas de menu */
import Groups from './views/Groups'
import Profile from './views/Profile'
import Dashboard from "./views/Dashboard"
import Leaderboard from './views/Leaderboard'
import GameSelector from './views/GameSelector'

/**Elementos de navegación */
import Navigation from "./components/Navigation"
import NavMenu from "./components/NavMenu"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
}))

function User() {
    const [Section, setSection] = useState(<Dashboard />)
    const [open, setOpen] = React.useState(false)

    const classes = useStyles()

    const OpenAction = () => {
        setOpen(!open)
    }

    /**Cambiar pantalla del menú */
    const ShowSection = (sec) => {
        switch (sec) {
            case 'dashboard':
                setSection(<Dashboard />)
                break;
            case 'play':
                setSection(<GameSelector />)
                break;
            case 'leaderboard':
                setSection(<Leaderboard />)
                break;
            case 'groups':
                setSection(<Groups />)
                break;
            case 'profile':
                setSection(<Profile />)
                break;
            default:
                setSection(<Dashboard />)
                break;
        }
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Navigation position="fixed" OpenAction={OpenAction} />
                <Hidden xsDown>
                    <NavMenu variant="permanent" open={true} section={ShowSection} />
                </Hidden>
                <Hidden smUp>
                    <NavMenu
                        variant="temporary"
                        open={open}
                        onClose={OpenAction}
                        section={ShowSection}
                    />
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    {Section}
                </div>
            </div>
        </React.Fragment>
    )
}

export default User
