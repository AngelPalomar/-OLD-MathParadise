import React from 'react'

import { makeStyles, Hidden } from '@material-ui/core'

import Groups from '../views/Groups'
import Profile from '../views/Profile'
import Navigation from '../components/Navigation'
import NavMenu from '../components/NavMenu'
import Dashboard from './Dashboard'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
}))

function Home() {

    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const OpenAction = () => {
        setOpen(!open)
    }

    let section = <Dashboard />

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Navigation position="fixed" OpenAction={OpenAction}/>
                <Hidden xsDown>
                    <NavMenu
                        variant="permanent"
                        open={true} />
                </Hidden>
                <Hidden smUp>
                    <NavMenu
                        variant="temporary"
                        open={open} 
                        onClose={OpenAction}/>
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    {section}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home



