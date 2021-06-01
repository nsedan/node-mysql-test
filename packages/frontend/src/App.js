import { BrowserRouter as Router } from "react-router-dom";

import OrderRoute from "./components/Orders/OrderRoute";
import NavBar from "./components/UI/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
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
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <NavBar />
        <OrderRoute />
        <Dashboard />
      </ThemeProvider>
    </Router>
  );
};

export default App;
