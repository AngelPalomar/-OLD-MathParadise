/**Layouts */
import LayoutUser from '../layouts/LayoutUser'
import LayoutAdmin from '../layouts/LayoutAdmin'

/**Admin Pages */
import AdminDashboard from '../pages/admin/Dashboard'

//Grupos
import AdminGroupsMenu from '../pages/admin/groups/MenuGroups'
import AdminGroupsCreate from '../pages/admin/groups/CreateGroup'

//Usuarios
import AdminUsersMenu from '../pages/admin/users/MenuUsers'

//Instituciones
import AdminInstitutionsMenu from '../pages/admin/institutions/MenuInstitutions'
import AdminInstitutionsCreate from '../pages/admin/institutions/CreateIInstitution'

//Ejercicios
import AdminExcercisesMenu from '../pages/admin/excercises/MenuExcercises'
import AdminExcercisesCreate from '../pages/admin/excercises/CreateExcercise'
import AdminExcerciseUpdate from '../pages/admin/excercises/UpdateExcercise'

//Areas
import AdminAreasMenu from '../pages/admin/areas/MenuAreas'
import AdminAreasCreate from '../pages/admin/areas/CreateArea'
import AdminAreaUpdate from '../pages/admin/areas/UpdateArea'

//Temas
import AdminTopicsMenu from '../pages/admin/topics/MenuTopics'
import AdminTopicsCreate from '../pages/admin/topics/CreateTopic'
import AdminTopicUpdate from '../pages/admin/topics/UpdateTopic'

//Subtemas
import AdminSubtopicsMenu from '../pages/admin/subtopics/MenuSubtopics'
import AdminSubtopicsCreate from '../pages/admin/subtopics/CreateSubtopic'
import AdminSubtopicUpdate from '../pages/admin/subtopics/UpdateSubtopic'

/** User Pages */
import Dashboard from '../pages/user/Dashboard'
import PlayMenu from '../pages/user/PlayMenu'
import Groups from '../pages/user/Groups'
import Leaderboard from '../pages/user/Leaderboard'
import Profile from '../pages/user/Profile'

/**Gamemode pages */
import RushMode from '../pages/games/rush/Rush'

//Classic pages
import Lobby from '../pages/user/lobby/Lobby'

import ClassicMode from '../pages/games/clasico/Classic'

/**General pages */
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Error from '../pages/Error404'
import PrivacyPolicies from '../pages/PrivacyPolicies'

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
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: '/admin',
                component: AdminDashboard,
                exact: true,
            },
            {
                path: '/admin/users',
                component: AdminUsersMenu,
                exact: true,
            },
            {
                path: '/admin/groups',
                component: AdminGroupsMenu,
                exact: true,
            },
            {
                path: '/admin/groups/create',
                component: AdminGroupsCreate,
                exact: true,
            },
            {
                path: '/admin/institutions',
                component: AdminInstitutionsMenu,
                exact: true
            },
            {
                path: '/admin/institutions/create',
                component: AdminInstitutionsCreate,
                exact: true
            },
            {
                path: '/admin/excercises',
                component: AdminExcercisesMenu,
                exact: true
            },
            {
                path: '/admin/excercises/create',
                component: AdminExcercisesCreate,
                exact: true,
            },
            {
                path: '/admin/excercises/update/:id',
                component: AdminExcerciseUpdate,
                exact: true,
            },
            {
                path: '/admin/areas',
                component: AdminAreasMenu,
                exact: true,
            },
            {
                path: '/admin/areas/create',
                component: AdminAreasCreate,
                exact: true,
            },
            {
                path: '/admin/areas/update/:id',
                component: AdminAreaUpdate,
                exact: true,
            },
            {
                path: '/admin/topics',
                component: AdminTopicsMenu,
                exact: true,
            },
            {
                path: '/admin/topics/create',
                component: AdminTopicsCreate,
                exact: true,
            },
            {
                path: '/admin/topics/update/:id',
                component: AdminTopicUpdate,
                exact: true,
            },
            {
                path: '/admin/subtopics',
                component: AdminSubtopicsMenu,
                exact: true,
            },
            {
                path: '/admin/subtopics/create',
                component: AdminSubtopicsCreate,
                exact: true,
            },
            {
                path: '/admin/subtopics/update/:id',
                component: AdminSubtopicUpdate,
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
                path: '/home/profile/@:nickname',
                component: Profile,
                exact: true
            },
            {
                component: Error
            }
        ]
    },
    /**
     *  Lobby
     *  Generará el PIN de la partida */
    {
        //path: '/lobby/:host/:gamemode/:difficulty/:area/:time',
        path: '/lobby',
        component: Lobby,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    },
    /**Modos de juego */
    {
        //Modo Rush
        path: '/rush',
        component: RushMode,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    },
    {
        //Modo Clásico, recibe el PIN de la partida para obtener la configuración
        path: '/classic/:pin',
        component: ClassicMode,
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
    /**Ruta de políticas de privacidad */
    {
        path: '/privacy-policies',
        component: PrivacyPolicies,
        exact: true,
        routes: [
            {
                component: Error
            }
        ]
    }
]

export default routes
