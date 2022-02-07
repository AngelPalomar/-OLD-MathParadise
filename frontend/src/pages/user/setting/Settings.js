import React from 'react'
import { Divider, Typography } from '@material-ui/core'
import { useStyles } from './useStyles'

/**Components */
import UpdateProfile from '../../../components/forms/UpdateProfile'
import UpdatePassword from '../../../components/forms/UpdatePassword'

function Settings() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant='h4' gutterBottom>
                Configuración general
            </Typography>
            <UpdateProfile />
            <Divider className={classes.divider} />
            <UpdatePassword />
            <Divider className={classes.divider} />
        </div>
    )
}

export default Settings
