import React, { useEffect } from 'react'

function Dashboard() {

    useEffect(() => {
        document.title = 'Resumen - Panel de administración | Math Paradise'
    }, [])

    return (
        <div>
            Admin Dashboard
        </div>
    )
}

export default Dashboard
