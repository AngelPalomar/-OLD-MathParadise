import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Box } from "@material-ui/core"

import DefaultAvatar from "./DefaultAvatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  username: {
    color: "#757575"
  },

}))

function Avatar(props) {
  const classes = useStyles()

  //Props
  const { name, lastname, nickname } = props

  return (
    <Paper elevation={2} className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item lg={2} md={3} sm={4} xs={3}>
          <DefaultAvatar nickname={nickname} size="60px" fs="100%" />
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
