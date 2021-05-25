import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";

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
