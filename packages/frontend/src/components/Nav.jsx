import React from "react";
import { Route, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Orders from "./Orders";

const Nav = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const [responseData, setData] = React.useState("");
  const getOrders = () => {
    fetch("http://localhost:4000/api/customer/81/orders")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(
          "There has been a problem with your fetch operation:",
          error.message
        );
      });
  };

  return (
    <div>
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
          <Tab
            component={Link}
            to="/orders"
            label="Orders"
            onClick={getOrders}
          />
        </Tabs>
      </Paper>

      <Route exact path="/orders">
        {responseData.length ? (
          <Orders orders={responseData} />
        ) : (
          <p>Nothing to show.</p>
        )}
      </Route>
    </div>
  );
};

export default Nav;
