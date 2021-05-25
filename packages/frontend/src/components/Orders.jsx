import React from "react";

import Order from "./Order";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
}))(TableCell);

const Orders = ({ orders }) => {
  return (
    <Box m={2}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>Num</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Subtotal</StyledTableCell>
              <StyledTableCell align="right">Shipping</StyledTableCell>
              <StyledTableCell align="right">Tax</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length
              ? orders.map((order) => {
                  return <Order key={order.order_id} order={order} />;
                })
              : "Nothing to show."}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
