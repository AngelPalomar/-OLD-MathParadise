import React from 'react'
import { makeStyles, Hidden } from "@material-ui/core"
import { Route, Switch, Redirect } from 'react-router-dom'

/**Elementos de navegación */
import Header from "../components/Header"
import NavMenu from "../components/NavMenu"

/**Hook para autenticación */
import useAuth from '../hooks/useAuth'

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

function LayoutUser(props) {
    const [open, setOpen] = React.useState(false)
    const { routes } = props
    const classes = useStyles()

    /**Menu lateral */
    const OpenAction = () => {
        setOpen(!open)
    }

    /**Si el usuario está logueado */
    const { user, isLoading } = useAuth()

    if (!user && !isLoading) {
        return (
            <>
                <Redirect to="/login"/>
            </>
        )
    }

    if (user && !isLoading) {
        return (
            <>
                <div className={classes.root}>
                    <Header position="fixed" OpenAction={OpenAction} />
                    <Hidden xsDown>
                        <NavMenu variant="permanent" open={true} />
                    </Hidden>
                    <Hidden smUp>
                        <NavMenu
                            variant="temporary"
                            open={open}
                            onClose={OpenAction}
                        />
                    </Hidden>
                    <div className={classes.content}>
                        <div className={classes.toolbar}></div>
                        <LoadRoute routes={routes} />
                    </div>
                </div>
            </>
        )   
    }

    return null
}

function LoadRoute({ routes }) {

    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component} />
                ))
            }
        </Switch>
    )
}

export default LayoutUser
