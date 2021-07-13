import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import classes from "./Auth.module.css";

const Auth = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    authCtx.login();
    history.replace("/dashboard");
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10}>
        <form onSubmit={onSubmitHandler} noValidate autoComplete="off">
          <TextField
            label="Username"
            type="username"
            variant="outlined"
            className={classes.input}
            ref={usernameInputRef}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className={classes.input}
            ref={passwordInputRef}
          />
          <Button
            type="submit"
            to="/dashboard"
            variant="contained"
            color="primary"
            className={classes.submitBtn}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
