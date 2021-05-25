import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Order from "./Order";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Orders = () => {
  const [responseData, setData] = React.useState("");
  const classes = useStyles();

  const onClick = () => {
    fetch("http://localhost:4000/api/orders")
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
    <div className={classes.root}>
      <Button variant="contained" onClick={onClick}>
        Click
      </Button>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Subtotal</th>
            <th scope="col">Shipping</th>
            <th scope="col">Tax</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        {responseData.length ? (
          responseData.map((order) => {
            return <Order key={order.order_id} order={order} />;
          })
        ) : (
          <tbody>
            <tr>
              <th scope="row" colSpan="5">Nothing to show.</th>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Orders;
