import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Paper, Grid, Box } from "@material-ui/core"

import DefaultAvatar from "./DefaultAvatar";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    username: {
        color: theme.palette.text.secondary
    },

}))

function UserCard(props) {
    const classes = useStyles()

    //Props
    const { name, lastname, nickname } = props

    return (
        <Paper elevation={2} className={classes.root}>
            <Grid container spacing={1} alignItems='center'>
                <Grid container item lg={2} md={3} sm={4} xs={3}>
                    <DefaultAvatar nickname={nickname} size="60px" fs="5vh" />
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

export default UserCard
