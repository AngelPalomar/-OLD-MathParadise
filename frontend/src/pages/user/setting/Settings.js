import React from 'react'
import { Typography } from '@material-ui/core'

/**Components */
import ProfileForm from '../../../components/forms/ProfileForm'

function Settings() {
    return (
        <div>
            <Typography variant='h4' gutterBottom>
                Configuración general
            </Typography>
            <Typography variant='h6' gutterBottom>Editar perfil</Typography>
            <ProfileForm />
        </div>
    )
}

export default Settings
