import React, { useEffect } from 'react'

export default function Groups() {

    useEffect(() => {
        document.title = 'Mis grupos - Math Paradise'
    }, [])

    return (
        <div>
            Groups
        </div>
    )
}

