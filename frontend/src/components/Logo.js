import React from 'react'

export default function Logo(props) {
    return (
        <img
            src={props.src}
            width={props.width}
            height={props.height}
            className={props.className}
            alt={props.alt}>
        </img>
    )
}
