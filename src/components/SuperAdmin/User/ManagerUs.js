import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SuperAdminNav from '../SuperAdminNav';
import TopNav from '../../TopNav';
import {ManageUser} from "./ManageUser";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function ClippedDrawer() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <TopNav />
            <div className={classes.root}>

                <CssBaseline />

                <SuperAdminNav />
                <div className="main">
                    <main className={classes.content}>

                        <Toolbar />

                        <Typography paragraph>
                            <ManageUser />
                        </Typography>

                    </main>
                </div>
            </div>
        </>
    );
}
