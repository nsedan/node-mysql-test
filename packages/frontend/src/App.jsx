import { useLocation } from "react-router-dom";

import OrdersPage from "./pages/OrdersPage";
import NavBar from "./components/UI/NavBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Auth from "./components/Auth/Auth";

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
  const location = useLocation();
  console.log(location);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <NavBar />
      <OrdersPage />
      <Dashboard />
      <Auth />
    </ThemeProvider>
  );
};

export default App;
