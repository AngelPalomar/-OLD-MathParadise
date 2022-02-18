import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2)
    },
    username: {
        color: theme.palette.text.secondary
    },

}))

export default useStyles;