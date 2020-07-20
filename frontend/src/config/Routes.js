/**Admin Pages */
import AdminHome from '../pages/admin/Admin'

/** User Pages */
import UserHome from '../pages/user/User'

/**Gamemode pages */
import RushMode from '../pages/games/Rush'

/**General pages */
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Error from '../pages/Error404'

const routes = [
    /**Rutas de administrador */
    {
        path: '/admin',
        component: AdminHome,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminHome,
                exact: true,
            },
            {
                component: Error
            }
        ]
    },
    /**Rutas de usuario (Tutor y estudiante) */
    {
        path: '/home',
        component: UserHome,
        exact: false,
        routes: [
            {
                path: '/home',
                component: UserHome,
                exact: true,
            },
            {
                component: Error
            }
        ]
    },
    {
        path: '/rush',
        component: RushMode,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    },
    /**Ruta de login */
    {
        path: '/login',
        component: Login,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    },
    /**Ruta de registro */
    {
        path: '/register',
        component: Register,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    },
    /**Página principal */
    {
        path: '/',
        component: Home,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    }
]

export default routes
