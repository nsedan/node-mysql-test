import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Orders = () => {
  const classes = useStyles();

  const onClick = () => {
    fetch("http://localhost:4000/api/orders")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className={classes.root}>
      <Button variant="contained" onClick={onClick}>
        Click
      </Button>
    </div>
  );
};

export default Orders;
