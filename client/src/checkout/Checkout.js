import React, { useContext, useEffect } from "react";
import PaymentForm from "./paymentForm/PaymentForm";
import OrderSummary from "./orderSummary/OrderSummary";
import classes from "./Checkout.module.css";
import { useHistory } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import CheckoutComplete from "./checkoutComplete/CheckoutComplete";
import { ProductContext } from "../context/ProductContext";
import GoBackButton from "../goBackButton/GoBackButton";

const Checkout = () => {
  const history = useHistory();
  const { newestState, dispatch } = useContext(ProductContext);
  const runningWhere = process.env.NODE_ENV;
  console.log(newestState, "in checkout");
  const goBack = () => {
    if (newestState.checkoutComplete) {
      dispatch({ type: "CHECKOUT_COMPLETE_GO_BACK" });
    }
    history.goBack();
  };
  return (
    <>
      <div>
        <NavBar />
        {/* <OrderSummary />
        <PaymentForm /> */}
        <div className={classes.CheckoutContainer}>
          <GoBackButton goBack={goBack} />
          <div className={classes.CheckoutInfoContainer}>
            {!newestState.checkoutComplete ? (
              <div>
                {" "}
                <OrderSummary />
                <PaymentForm />{" "}
              </div>
            ) : (
              <CheckoutComplete />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
