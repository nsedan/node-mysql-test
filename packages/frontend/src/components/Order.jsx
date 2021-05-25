import React from "react";

import formatTime from "../utils/formatTime";

import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Order = ({ order }) => {
  return (
    <StyledTableRow>
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
    </StyledTableRow>
  );
};

export default Order;
