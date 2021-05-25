import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";

import Orders from "./Orders";
import Dashboard from "./Dashboard";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";

const Nav = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const [responseData, setData] = useState("");
  useEffect(() => {
    axios("http://localhost:4000/api/customer/81/orders")
      .then((res) => {
        const response = res.data;
        setData(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your request:",
          error.message
        );
      });
  }, []);

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab component={Link} to="/" label="Dashboard" />
          <Tab component={Link} to="/orders" label="Orders" />
        </Tabs>
      </Paper>

      <Route exact path="/orders">
        <Box m={5} display="flex" justifyContent="center">
          {responseData.length ? (
            <Orders orders={responseData} />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Route>
      <Route exact path="/">
        <Dashboard />
      </Route>
    </>
  );
};

export default Nav;
