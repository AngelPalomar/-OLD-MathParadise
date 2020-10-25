import { makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        padding: theme.spacing(2),
    },
    paperConfig: {
        padding: theme.spacing(2),
        background: "rgb(255, 255, 255)",
    },
    classicPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #388659, #98CE00)"
    },
    classicInfo: {
        background: "linear-gradient(#2a9134, #2a9134)",
        color: "#FFFFFF"
    },
    ArcadePaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #6A041D, #FF006E)"
    },
    arcadeInfo: {
        background: "linear-gradient(#C80057, #C80057)",
        color: "#FFFFFF"
    },
    RushPaper: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #00487C, #2A8EFF)"
    },
    rushInfo: {
        background: "linear-gradient(#0063D3, #0063D3)",
        color: "#FFFFFF"
    },
    disabled: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #515151, #A1A1A1)"
    },
    select: {
        backgroundColor: "#FFFFFF",
    },
    grid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    box: {
        marginTop: theme.spacing(2),
    },
    playButton: {
        padding: theme.spacing(2),
        color: "#FFFFFF",
        background: "linear-gradient(45deg, #2A55FF, #15FFD4)",
        textAlign: "center"
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.text.primary
        }
    }
}))