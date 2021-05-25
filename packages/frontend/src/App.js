import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Nav />

      <Route exact path="/">
        <Dashboard />
      </Route>
    </Router>
  );
}

export default App;
