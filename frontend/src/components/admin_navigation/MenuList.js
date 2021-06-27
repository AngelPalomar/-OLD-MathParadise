import React, { Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { Link } from "react-router-dom";
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"

/**APIs */
import { getAccessTokenApi } from '../../api/auth'

/**Icons */
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
//import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ApartmentIcon from '@material-ui/icons/Apartment'
import FunctionsIcon from '@material-ui/icons/Functions'
import DashboardIcon from '@material-ui/icons/Dashboard'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarksIcon from '@material-ui/icons/Bookmarks'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary
        }
    }
}));

function MenuList(props) {
    const classes = useStyles()
    const { url } = props
    const { role } = jwtDecode(getAccessTokenApi())

    return (
        <div className={classes.root}>
            <List component="nav">

                <Link to="/admin" className={classes.link}>
                    <ListItem button selected={url === '/admin' ? true : false}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </Link>

                {
                    role === 'admin' ?
                        <Fragment>
                            <Link to="/admin/users" className={classes.link}>
                                <ListItem button selected={url === '/admin/users' ? true : false}>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Usuarios" />
                                </ListItem>
                            </Link>

                            {/* <Link to="/admin/groups" className={classes.link}>
                                <ListItem button selected={url === '/admin/groups' ? true : false}>
                                    <ListItemIcon>
                                        <PeopleAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Grupos" />
                                </ListItem>
                            </Link>
 */}
                            <Link to="/admin/institutions" className={classes.link}>
                                <ListItem button selected={url === '/admin/institutions' ? true : false}>
                                    <ListItemIcon>
                                        <ApartmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Instituciones" />
                                </ListItem>
                            </Link>
                        </Fragment> : null
                }

                <Link to="/admin/areas" className={classes.link}>
                    <ListItem button selected={url === '/admin/areas' ? true : false}>
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Áreas" />
                    </ListItem>
                </Link>

                <Link to="/admin/topics" className={classes.link}>
                    <ListItem button selected={url === '/admin/topics' ? true : false}>
                        <ListItemIcon>
                            <BookmarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Temas" />
                    </ListItem>
                </Link>

                <Link to="/admin/subtopics" className={classes.link}>
                    <ListItem button selected={url === '/admin/subtopics' ? true : false}>
                        <ListItemIcon>
                            <BookmarksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subtemas" />
                    </ListItem>
                </Link>

                <Link to="/admin/excercises" className={classes.link}>
                    <ListItem button selected={url === '/admin/excercises' ? true : false}>
                        <ListItemIcon>
                            <FunctionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ejercicios" />
                    </ListItem>
                </Link>

                <Divider />

                <Link to="/home" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tablero principal" />
                    </ListItem>
                </Link>
            </List>
        </div>
    )
}

export default MenuList
