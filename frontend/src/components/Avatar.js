import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Box, Avatar as AvatarImage } from "@material-ui/core"

//import defaultAvatar from "../assets/images/avatars/default_avatar_1.svg"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  username: {
    color: "#757575"
  },

  avatar: {
    color: '#FFF',
    background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
    width: theme.spacing(7),
    height: theme.spacing(7),
  }

}));

function Avatar(props) {
  const classes = useStyles()

  //Props
  const { name, lastname, nickname } = props

  const [initialAvatar, setInitialAvatar] = useState('')
  useEffect(() => {
    let nick = String(nickname).toUpperCase()
    setInitialAvatar(nick.charAt(0))
  }, [nickname])

  return (
    <Paper elevation={2} className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item lg={2} md={3} sm={4} xs={3}>
          <AvatarImage className={classes.avatar} >
            <Typography variant="h5">
              {initialAvatar}
            </Typography>
          </AvatarImage>
        </Grid>
        <Grid container item lg={10} ms={9} sm={8} xs={9}>
          <Typography component="div">
            <Box fontSize="h6.fontSize">
              {name + ' ' + lastname}
            </Box>
            <Box className={classes.username}>
              @{nickname}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Avatar
