import React from 'react'
import {
    Slide
} from '@material-ui/core'

export const UpTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})