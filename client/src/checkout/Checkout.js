import React from "react";
import PaymentForm from "./paymentForm/PaymentForm";
import OrderSummary from "./orderSummary/OrderSummary";
import classes from "./Checkout.module.css";
import { useHistory } from "react-router-dom";
import NavBar from "../navbar/NavBar";
const Checkout = () => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <>
      <NavBar />
      <button onClick={goBack}>Go back</button>
      <div className={classes.CheckoutContainer}>
        <div className={classes.CheckoutInfoContainer}>
          <OrderSummary />
          <PaymentForm />
        </div>
      </div>
    </>
  );
};

export default Checkout;
