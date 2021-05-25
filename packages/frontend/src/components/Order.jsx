import React from "react";

const Order = ({ order }) => {
  const formatTime = (iso) => {
    const unixtimestamp = iso;
    const months_arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(unixtimestamp);
    const year = date.getFullYear();
    const month = months_arr[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const time =
      month +
      "-" +
      day +
      "-" +
      year +
      " " +
      hours +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2);
    return time;
  };

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
