import React from "react";
import classes from "./OrderSummary.module.css";
const OrderSummary = () => {
  return (
    <>
      <h2>Order Summary</h2>
      <div className={classes.OrderSummaryContainer}>
        <div>img | name | price</div>
        <hr></hr>
        <div>
          <p>SUB TOTAL | price</p>
          <p>DELIVERY | method</p>
          <p>DISCOUNT | code</p>
          <p>TOTAL | total price</p>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
