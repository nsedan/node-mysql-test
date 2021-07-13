import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthContext from "./context/auth-context";

import OrdersPage from "./pages/OrdersPage";
import DashboardPage from "./pages/DashboardPage";
import AuthPage from "./pages/AuthPage";
import NavBar from "./components/UI/NavBar";
import SideMenu from "./components/UI/SideMenu";

import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { indigo, lime } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[400],
    },
    secondary: {
      main: lime[400],
    },
  },
  overrides: {
    MuiButton: {
      text: {
        color: "white",
      },
    },
  },
});

const App = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <NavBar />
      <Switch>
        <Route exact path="/">
          <AuthPage />
        </Route>
        {isLoggedIn && (
          <>
            <Grid container>
              <Grid item xs={2}>
                <SideMenu />
              </Grid>
              <Grid item xs={10}>
                <Route exact path="/dashboard">
                  <DashboardPage />
                </Route>
                <Route exact path="/orders">
                  <OrdersPage />
                </Route>
              </Grid>
            </Grid>
          </>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
