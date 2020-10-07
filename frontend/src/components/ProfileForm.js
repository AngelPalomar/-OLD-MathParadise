import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'
import { makeStyles } from "@material-ui/core/styles"
import { Grid, TextField, Button } from "@material-ui/core"

function ProfileForm(props) {
    const { userData } = props
    return (
        <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField type="text" name="name" label="*Nombres" variant="outlined" fullWidth defaultValue={userData.name}></TextField>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField type="text" name="lastname" label="*Apellidos" variant="outlined" fullWidth defaultValue={userData.lastname}></TextField>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField type="text" name="nickname" label="*Alias" variant="outlined" fullWidth defaultValue={userData.nickname}></TextField>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField type="email" name="email" label="*Correo electrónico" variant="outlined" fullWidth defaultValue={userData.email}></TextField>
            </Grid>
        </Grid>
    )
}

export default ProfileForm
