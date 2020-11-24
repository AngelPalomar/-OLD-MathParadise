import React from 'react'

function Dashboard() {

    React.useEffect(() => {
        document.title = 'Resumen - Panel de administración | Math Paradise'
    }, [])

    return (
        <div>
            Admin Dashboard
        </div>
    )
}

export default Dashboard
