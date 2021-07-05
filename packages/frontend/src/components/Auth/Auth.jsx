import React, { useContext, useRef } from "react";
import { Route, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import Container from "@material-ui/core/Container";
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
    <Route exact path="/">
      <Container maxWidth="xs">
        <Box mt={10}>
          <form onSubmit={onSubmitHandler}>
            <div className={classes.Input}>
              <input
                placeholder="Username"
                type="username"
                required
                ref={usernameInputRef}
              />
              <input
                placeholder="Password"
                type="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <button className={classes.SubmitBtn}>Login</button>
          </form>
        </Box>
      </Container>
    </Route>
  );
};

export default Auth;
