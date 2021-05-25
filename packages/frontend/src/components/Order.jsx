import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import formatTime from "../utils/formatTime";

const Order = ({ order }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {order.order_id}
      </TableCell>
      <TableCell align="right">
        {formatTime(Date.parse(order.date_created))}
      </TableCell>
      <TableCell align="right">{order.status}</TableCell>
      <TableCell align="right">{order.net_total}</TableCell>
      <TableCell align="right">{order.shipping_total}</TableCell>
      <TableCell align="right">{order.tax_total}</TableCell>
      <TableCell align="right">{order.total_sales}</TableCell>
    </TableRow>
  );
};

export default Order;
