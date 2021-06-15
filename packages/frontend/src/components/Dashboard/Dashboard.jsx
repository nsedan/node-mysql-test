import React from "react";
import { Route } from "react-router-dom";

import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Route exact path="/dashboard">
      <Box display="flex" justifyContent="center">
        <h1>Dashboard</h1>
      </Box>
      <div className={classes.root}>
        <Paper elevation={3} />
        <Paper elevation={3} />
        <Paper elevation={3} />
        <Paper elevation={3} />
      </div>
    </Route>
  );
};

export default Dashboard;
