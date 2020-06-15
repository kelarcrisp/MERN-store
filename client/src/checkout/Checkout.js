import React, { useContext } from "react";
import PaymentForm from "./paymentForm/PaymentForm";
import OrderSummary from "./orderSummary/OrderSummary";
import classes from "./Checkout.module.css";
import { useHistory } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import CheckoutComplete from "./checkoutComplete/CheckoutComplete";
import { ProductContext } from "../context/ProductContext";
const Checkout = () => {
  const history = useHistory();
  const { newestState, dispatch } = useContext(ProductContext);
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
        <button onClick={goBack}>Go back</button>
        <div className={classes.CheckoutContainer}>
          <div className={classes.CheckoutInfoContainer}>
            {newestState.checkoutComplete === false ? (
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
