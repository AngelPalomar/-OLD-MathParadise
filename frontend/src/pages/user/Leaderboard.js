import React, { useEffect } from 'react'

export default function Leaderboard() {

    useEffect(() => {
        document.title = 'Clasificación global - Math Paradise'
    }, [])

    return (
        <div>
            Leaderboard
        </div>
    )
}

