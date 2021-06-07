import React from "react";
import { Link } from "react-router-dom";

import SideMenu from "./SideMenu";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
    <AppBar position="static">
      <Toolbar>
        <SideMenu />
        <Typography variant="h6" className={classes.title}>
          Portal
        </Typography>
        <Button component={Link} to={"/login"} color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
