/**Layouts */
import LayoutUser from '../layouts/LayoutUser'

/**Admin Pages */
import AdminHome from '../pages/admin/Admin'

/** User Pages */
import Dashboard from '../pages/user/Dashboard'
import PlayMenu from '../pages/user/PlayMenu'
import Groups from '../pages/user/Groups'
import Leaderboard from '../pages/user/Leaderboard'
import Profile from '../pages/user/Profile'

/**Gamemode pages */
import RushMode from '../pages/games/rush/Rush'

/**General pages */
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Error from '../pages/Error404'

const routes = [
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
    },

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
                path: '/admin/users',
                component: AdminHome,
                exact: true,
            },
            {
                path: '/admin/groups',
                component: AdminHome,
                exact: true,
            },
            {
                path: '/admin/excercises',
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
        component: LayoutUser,
        exact: false,
        routes: [
            {
                path: '/home',
                component: Dashboard,
                exact: true,
            },
            {
                path: '/home/play',
                component: PlayMenu,
                exact: true,
            },
            {
                path: '/home/groups',
                component: Groups,
                exact: true,
            },
            {
                path: '/home/leaderboard',
                component: Leaderboard,
                exact: true,
            },
            {
                path: '/home/profile',
                component: Profile,
                exact: true,
            },
            {
                component: Error
            }
        ]
    },
    /**Modos de juego */
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
        path: '/sign-up',
        component: SignUp,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    },
]

export default routes
