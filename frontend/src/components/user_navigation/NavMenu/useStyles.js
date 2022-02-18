import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    logo: {
        textAlign: "center",
        marginTop: theme.spacing(1.3),
    },
    logoSize: {
        width: '75%'
    }
}));

export default useStyles;