import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid, Box, Avatar as AvatarImage } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  username: {
    color: "#757575"
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }

}));

function Avatar(props) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item lg={2} md={3} sm={4} xs={3}>
          <AvatarImage className={classes.large} />
        </Grid>
        <Grid container item lg={10} ms={9} sm={8} xs={9}>
          <Typography component="div">
            <Box fontSize="h6.fontSize">
              Nombre completo
                </Box>
            <Box className={classes.username}>
              @usuario
                </Box>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Avatar
