import React, { useEffect } from 'react'

import PublicHeader from '../components/PublicHeader'

function Home() {

    useEffect(() => {
        document.title = 'Math Paradise'
    }, [])

    return (
        <>
            <PublicHeader />
        </>
    )
}

export default Home
