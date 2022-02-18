import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './useStyles'

function Dashboard() {
    const classes = useStyles();

    React.useEffect(() => {
        document.title = 'Resumen - Panel de administración | Math Paradise'
    }, [])

    return (
        <div>
            <Typography variant='h4' className={classes.title} gutterBottom>
                Panel general
            </Typography>
        </div>
    )
}

export default Dashboard
