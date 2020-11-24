import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles, List, ListItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core"

/**Icons */
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
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

    return (
        <div className={classes.root}>
            <List component="nav">

                <Link to="/admin" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </Link>

                <Link to="/admin/users" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                    </ListItem>
                </Link>

                <Link to="/admin/groups" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Grupos" />
                    </ListItem>
                </Link>

                <Link to="/admin/institutions" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <ApartmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Instituciones" />
                    </ListItem>
                </Link>

                <Link to="/admin/areas" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <MenuBookIcon />
                        </ListItemIcon>
                        <ListItemText primary="Áreas" />
                    </ListItem>
                </Link>

                <Link to="/admin/topics" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <BookmarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Temas" />
                    </ListItem>
                </Link>

                <Link to="/admin/subtopics" className={classes.link}>
                    <ListItem button >
                        <ListItemIcon>
                            <BookmarksIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subtemas" />
                    </ListItem>
                </Link>

                <Link to="/admin/excercises" className={classes.link}>
                    <ListItem button >
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
