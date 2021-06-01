import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import Orders from "./Orders";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const OrderRoute = () => {
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
    <Route exact path="/orders">
      <Box m={5} display="flex" justifyContent="center">
        {responseData.length ? (
          <Orders orders={responseData} />
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Route>
  );
};

export default OrderRoute;
