import React from "react";

import SideMenu from "./SideMenu";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Order Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <SideMenu />
    </React.Fragment>
  );
};

export default NavBar;
