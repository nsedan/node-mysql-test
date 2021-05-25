import { BrowserRouter as Router } from "react-router-dom";

import Nav from "./components/Nav";

import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";

function App() {
  return (
    <Router>
      <CssBaseline />

      <Nav />
    </Router>
  );
}

export default App;
