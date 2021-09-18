import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    typography: {
        fontFamily: "DM Sans, sans-serif",
        button: {
            textTransform: "none",
            fontSize: "1rem"
        }
    },
    palette: {
        type: 'light',
        primary: {
            light: "#476CFF",
            main: "#2A55FF",
            dark: "#0033FE"
        },
        secondary: {
            light: "#68FFE3",
            main: "#15FFD4",
            dark: "#00D8B1"
        },
        event: {
            light: "#7E00F4",
            main: "#330063",
            dark: "#0D001A"
        },
        disabled: {
            light: "#939495",
            main: "#818284",
            dark: "#6E6F71"
        },
        error: {
            light: "#FF475D",
            main: "#FF2942",
            dark: "#FF142F"
        },
        success: {
            light: "#00CF7C",
            main: "#00B76F",
            dark: "#00AA66"
        },
        warning: {
            light: "#FF9D47",
            main: "#FF8D29",
            dark: "#FF8114"
        },
        classic: {
            light: "#35B642",
            main: "#2A9134",
            dark: "#247D2D"
        },
        arcade: {
            light: "#F30069",
            main: "#C80057",
            dark: "#AA004A"
        },
        rush: {
            light: "#0076FC",
            main: "#0063D3",
            dark: "#0054B3"
        }
    },
})

export default theme