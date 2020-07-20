import React from "react";
import {
  //Typography,
  //Paper,
  Grid,
  //Container,
  //Button,
  //Box,
  //TextField,
  //FormControl,
  //AppBar,
  //Toolbar,
} from "@material-ui/core";

import Avatar from '../components/Avatar'

function Dashboard() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={9} sm={6} md={4} lg={4}>
          <Avatar />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
