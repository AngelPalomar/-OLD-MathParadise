import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core'

/**Components */
import PublicHeader from '../components/PublicHeader'

/**APIs */
import { getAccessTokenApi } from '../api/auth'

/**Images */
import error_banner from '../assets/images/banners/error404_banner.svg'

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        margin: theme.spacing(4),
    },
    banner: {
        width: '50%'
    }
}))

function Error404() {
    const classes = useStyle()
    return (
        <Fragment>
            {!getAccessTokenApi() ? <PublicHeader /> : null}
            <div className={classes.root}>
                <img src={error_banner} alt="error404.svg" className={classes.banner} />
            </div>
        </Fragment>
    )
}

export default Error404
