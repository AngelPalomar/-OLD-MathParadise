import React, { useState } from "react"

import { makeStyles, Hidden } from "@material-ui/core"

/**Pantallas de menu */
import Groups from "./Groups"
import Profile from './Profile'
import Dashboard from "./Dashboard"
import Leaderboard from './Leaderboard'
import GameSelector from './GameSelector'

import Navigation from "../other/Navigation"
import NavMenu from "../other/NavMenu"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

function Home() {
  const [Section, setSection] = useState(<Dashboard />);
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const OpenAction = () => {
    setOpen(!open);
  };

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
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Navigation position="fixed" OpenAction={OpenAction} />
        <Hidden xsDown>
          <NavMenu variant="permanent" open={true} section={ShowSection}/>
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
  );
}

export default Home
