import React from "react";
import Order from "./Order";

const Orders = ({ orders }) => {
  return (
    <>
      <table>
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
        {orders.length ? (
          orders.map((order) => {
            return <Order key={order.order_id} order={order} />;
          })
        ) : (
          <tbody>
            <tr>
              <th scope="row" colSpan="5">
                Nothing to show.
              </th>
            </tr>
          </tbody>
        )}
      </table>
    </>
  );
};

export default Orders;
