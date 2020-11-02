import React from 'react'
import LogoSource from '../assets/images/logos/MathParadiseLogo.svg'

function Logo(props) {
    return (
        <img
            src={LogoSource}
            className={props.className}
            alt={props.alt}>
        </img>
    )
}

export default Logo
