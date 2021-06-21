import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import Orders from "../components/Orders/Orders";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const OrdersPage = () => {
  const [responseData, setData] = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const key = Object.keys(params)[0];
    const value = params[key];

    const query = value !== undefined ? `?${key}=${value}` : '';

    axios(`http://localhost:4000/api/orders${query}`)
      .then((res) => {
        const response = res.data;
        setData(response);
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

export default OrdersPage;
