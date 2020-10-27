import React from 'react'
import JwtDecode from 'jwt-decode'
import { Route, Switch, Redirect } from 'react-router-dom'
import { makeStyles, Hidden } from "@material-ui/core"

/**Componentes */
import Login from '../pages/Login'

/**Navegación */
import Header from '../components/Header'
import NavMenu from '../components/admin_navigation/NavMenu'

/**APIs */
import { getAccessTokenApi } from '../api/auth'

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

function LayoutAdmin(props) {
    const [open, setOpen] = React.useState(false)
    const { routes, match: { path } } = props
    const { role } = JwtDecode(getAccessTokenApi())
    const classes = useStyles()

    const OpenAction = () => {
        setOpen(!open)
    }

    /**Si el usuario está logueado */
    const { user, isLoading } = useAuth()

    if ((!user && !isLoading) || !getAccessTokenApi()) {
        return (
            <>
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
            </>
        )
    }

    if (user && !isLoading && (role === 'admin' || role === 'moderator')) {
        return (
            <div className={classes.root}>
                <Header position="fixed" OpenAction={OpenAction} title={path} />
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

export default LayoutAdmin
