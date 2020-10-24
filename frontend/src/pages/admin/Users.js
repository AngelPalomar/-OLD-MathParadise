import React, { useEffect } from 'react'

function Users() {

    useEffect(() => {
        document.title = 'Usuarios - Panel de administración | Math Paradise'
    }, [])

    return (
        <div>
            Usuarios
        </div>
    )
}

export default Users
