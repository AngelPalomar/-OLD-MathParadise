import React, { useState, useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { Typography, LinearProgress } from '@material-ui/core'
import { useStyles } from './useStyles'

/**APi */
import { getAccessTokenApi } from '../../../api/auth'
import { getHistoryByNicknameApi } from '../../../api/history'

/**Components */
import GameHistoryCard from '../../../components/game_history_card/GameHistoryCard'

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
            setGameHistory(null)
        }
    }, [])

    if (isLoading) {
        return <LinearProgress variant='indeterminate' />
    }

    return (
        <div>
            <Typography variant='h4' gutterBottom>Historial de partidas</Typography>
            <Typography>Presionar para ver detalles</Typography>
            <div className={classes.list}>
                {
                    gameHistory.length === 0 ?
                        <Typography>No hay partidas registradas.</Typography> :
                        <Fragment>
                            {
                                gameHistory.map((value, index) => (
                                    <GameHistoryCard key={index} historyData={value} />
                                ))
                            }
                        </Fragment>
                }
            </div>
        </div>
    )
}

export default History
