import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        fontFamily: "DM Sans, sans-serif",
        button: {
            textTransform: "none",
            fontSize: "1rem"
        }
    },

    palette: {
        primary: {
            light: "#15FFD4",
            main: "#2A55FF",
            dark: "#2A55FF"
        },
    },
})

export default theme