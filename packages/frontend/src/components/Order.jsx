import React from "react";
import formatTime from "../utils/formatTime";

const Order = ({ order }) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{order.order_id}</th>
        <td>{formatTime(Date.parse(order.date_created))}</td>
        <td>{order.status}</td>
        <td>{order.net_total}</td>
        <td>{order.shipping_total}</td>
        <td>{order.tax_total}</td>
        <td>{order.total_sales}</td>
      </tr>
    </tbody>
  );
};

export default Order;
