import React, { useState, useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { Typography, LinearProgress } from '@material-ui/core'
import { useStyles } from './useStyles'

/**APi */
import { getAccessTokenApi } from '../../../api/auth'
import { getHistoryByNicknameApi } from '../../../api/history'

/**Components */
import GameHistoryAccordion from '../../../components/game_history_card/GameHistoryAccordion'

function History() {
    const classes = useStyles()
    const [gameHistory, setGameHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const nickname = jwtDecode(getAccessTokenApi()).nickname

    //Trae los datos de partidas por el nickname
    useEffect(() => {
        getHistoryByNicknameApi(nickname).then(response => {
            if (response) {
                setGameHistory(response.history)
                setIsLoading(false)
            } else {
                setIsLoading(false)
                setGameHistory([])
            }
        })
        return () => {
            setGameHistory([])
        }
    }, [nickname])

    if (isLoading) {
        return <LinearProgress variant='indeterminate' />
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant='h4' gutterBottom color='primary'>Historial de partidas</Typography>
                <Typography>
                    Desglose de todas tus partidas jugadas, presiona para ver más
                    detalles.
                </Typography>
            </div>
            <div className={classes.list}>
                {
                    gameHistory.length === 0 ?
                        <Typography className={classes.noPlaysText}>No hay partidas registradas.</Typography> :
                        <Fragment>
                            {
                                gameHistory.map((value, index) => (
                                    <GameHistoryAccordion key={index} historyData={value} />
                                ))
                            }
                        </Fragment>
                }
            </div>
        </div>
    )
}

export default History
