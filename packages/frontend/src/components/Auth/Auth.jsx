import React from "react";
import { Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    width: "100%",
  },
}));

const Auth = () => {
  const classes = useStyles();
  return (
    <Route exact path="/">
      <Container maxWidth="sm">
        <Box mt={10}>
          <Grow in={true}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                fullWidth
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </Grow>
        </Box>
      </Container>
    </Route>
  );
};

export default Auth;
