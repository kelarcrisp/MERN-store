import React, { useContext } from "react";
import classes from "./PaymentForm.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "../../signInError/SignInError";
import { ProductContext } from "../../context/ProductContext";
import emailjs from "emailjs-com";
const validationSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(16, "Must be exactly 16 digits")
    .max(16, "Must be exactly 16 digits"),
  cvc: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(3, "Must be exactly 3 digits")
    .max(3, "Must be exactly 3 digits")
});

const PaymentForm = () => {
  //THIS IS THE EMAIL TO SEND TO THE SERVER AND ACTUALLY SEND AN EMAIL TO
  const userEmailFromStorage = JSON.parse(localStorage.getItem("jwt-token"));
  const { newestState, dispatch } = useContext(ProductContext);
  const runningWhere = process.env.NODE_ENV;

  return (
    <>
      <h2>Payment Form</h2>
      <Formik
        initialValues={{
          cardNumber: "",
          expMonth: "",
          expYear: "",
          cvc: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const emailToSend = {
            from_name: "kelar",
            to_name: userEmailFromStorage.email,
            subject: "bluh",
            message_html: "message"
          };
          const serviceId = "gmail";
          const templateId = "paymenttemplate";
          const userId = "user_dyzjhIcsAc5ZmpmGA2Kif";
          emailjs
            .send(serviceId, templateId, emailToSend, userId)
            .then(res => "woo")
            .catch(err => console.log(err, "err"));
          dispatch({ type: "CHECKOUT_COMPLETE" });
          const deletePost = axios.delete(
            runningWhere === "development"
              ? "http://localhost:5000/api/userCart"
              : "/api/userCart",
            {
              headers: {
                Authorization: "null"
              },
              data: {
                source: newestState.cartProducts
              }
            }
          );

          // const sendPost = axios.post(
          //   runningWhere === "development"
          //     ? "http://localhost:5000/api/sendEmail"
          //     : "/api/sendEmail",
          //   {
          //     headers: {
          //       Authorization: "null"
          //     },
          //     data: {
          //       source: userEmail
          //     }
          //   }
          // );

          //CONFIRM THIS WORKS
          axios.all([deletePost]).then(
            axios.spread((...responses) => {
              const responseOne = responses[0];
              const responseTwo = responses[1];
              console.log({ responseOne, responseTwo });
            })
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <div className={classes.PaymentFormContainer}>
            <form
              className={classes.PaymentForm}
              id="form"
              onSubmit={handleSubmit}
            >
              <label htmlFor="cardnumber">Card Number</label>
              <input
                name="cardNumber"
                onChange={handleChange}
                value={values.cardNumber}
                onBlur={handleBlur}
                className={classes.CardNumberInput}
                id="cardnumber"
                placeholder="XXXX"
              />
              <Error touched={touched.cardNumber} message={errors.cardNumber} />
              <label htmlFor="expmonth">Exp. Month</label>
              <select
                id="expmonth"
                name="expMonth"
                onChange={handleChange}
                value={values.expMonth}
              >
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
              <label htmlFor="expYear">Exp. Year</label>
              <select
                id="expyear"
                name="expYear"
                onChange={handleChange}
                value={values.expYear}
              >
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
              </select>
              <label htmlFor="cvc">Cvc.</label>
              <input
                name="cvc"
                onChange={handleChange}
                value={values.Cvc}
                onBlur={handleBlur}
                id="cvc"
                placeholder="Cvc."
              />
              <Error touched={touched.cvc} message={errors.cvc} />
              <button
                type="submit"
                className={classes.SubmitFormButton}
                onClick={handleSubmit}
              >
                Submit Form
              </button>
            </form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default PaymentForm;
