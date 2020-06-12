import React from "react";
import classes from "./PaymentForm.module.css";
const PaymentForm = () => {
  return (
    <>
      <h2>Payment Form</h2>
      <div className={classes.PaymentFormContainer}>
        <form className={classes.PaymentForm}>
          <label htmlFor="cardnumber">Card Number</label>
          <input
            className={classes.CardNumberInput}
            id="cardnumber"
            placeholder="XXXX"
          />
          <label htmlFor="expmonth">Exp. Month</label>
          <select id="expmonth">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <label htmlFor="expyear">Exp. Year</label>
          <select id="expyear">
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
          <label htmlFor="cvc">Cvc.</label>
          <input id="cvc" placeholder="Cvc" />
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
