import React, { useEffect, Fragment } from 'react'
import { Howler } from 'howler'
import { makeStyles, Hidden } from "@material-ui/core"
import { Route, Switch, Redirect } from 'react-router-dom'

/**Componentes */
import Login from '../pages/Login'

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
    const { routes, match: { path } } = props
    const classes = useStyles()

    //Descargar sonidos
    useEffect(() => {
        Howler.stop()
    }, [])

    /**Menu lateral */
    const OpenAction = () => {
        setOpen(!open)
    }

    /**Si el usuario está logueado */
    const { user, isLoading } = useAuth()

    if (!user && !isLoading) {
        return (
            <Fragment>
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
            </Fragment>
        )
    }

    if (user && !isLoading) {
        return (
            <div className={classes.root}>
                <Header position="fixed" OpenAction={OpenAction} />
                <Hidden xsDown>
                    <NavMenu
                        variant="permanent"
                        open={true} title={path}
                        url={props.location.pathname} />
                </Hidden>
                <Hidden smUp>
                    <NavMenu
                        variant="temporary"
                        open={open}
                        onClose={OpenAction}
                        url={props.location.pathname}
                    />
                </Hidden>
                <div className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <LoadRoute routes={routes} />
                </div>
            </div>
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
