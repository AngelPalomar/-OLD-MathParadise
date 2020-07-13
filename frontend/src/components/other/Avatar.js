import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Grid, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },

  username: {
      color: "#757575"
  }

}));

function Avatar(props) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={4}>
          Avatar
        </Grid>
        <Grid container item xs={8}>
            <Typography component="div">
                <Box fontSize="h5.fontSize">
                    Nombre completo
                </Box>
                <Box className={classes.username}>
                    @usuario
                </Box>
            </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Avatar;
