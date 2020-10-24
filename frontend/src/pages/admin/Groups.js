import React, { useEffect } from 'react'

function Groups() {

    useEffect(() => {
        document.title = 'Grupos - Panel de administración | Math Paradise'
    }, [])

    return (
        <div>
            Grupos
        </div>
    )
}

export default Groups
