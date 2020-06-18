import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./Login.module.css";
import Signup from "../signup/Signup";
import Error from "../signInError/SignInError";
import axios from "axios";
import { Spinner } from "../spinner/Spinner";
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});
const Login = props => {
  const { history } = props;
  const runningWhere = process.env.NODE_ENV;
  const [showSignup, setShowSignup] = useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (showSignup) {
      document.querySelector("#loginForm").style.display = "none";
      document.querySelector("#signupForm").style.display = "flex";
      document.querySelector("#Button").style.transform = "translateX(100%)";
    } else {
      document.querySelector("#signupForm").style.display = "none";
      document.querySelector("#loginForm").style.display = "flex";
      document.querySelector("#Button").style.transform = "translateX(0%)";
    }
  }, [showSignup]);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        //MAKE API CALL TO CHECK IF THE USERNAME IS ALREADY IN USE
        axios
          .post(
            runningWhere === "development"
              ? "http://localhost:5000/api/user/signin"
              : "/api/user/signin",
            values
          )
          .then(response => {
            setSubmitting(false);
            resetForm(true);
            history.replace("/products");
            setShowError(false);
            localStorage.setItem("jwt-token", response.data.token);
          })
          .catch(err => {
            setSubmitting(false);
            setShowError(true);
          });
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
        <div className={classes.LoginContainer}>
          <h2 className={classes.LoginHeader}>Kelar's amazing starbucks</h2>
          <div className={classes.FormContainer}>
            <div className={classes.ButtonBox}>
              <div id="Button" className={classes.Button}></div>
              <button
                className={classes.ToggleButton}
                type="button"
                onClick={() => setShowSignup(false)}
              >
                log in
              </button>
              <button
                className={classes.ToggleButton}
                onClick={() => setShowSignup(true)}
                type="button"
              >
                sign up
              </button>
            </div>
            <form
              id="loginForm"
              className={classes.Form}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className={classes.InputField}
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
              />
              <Error touched={touched.email} message={errors.email} />
              <input
                type="password"
                className={classes.InputField}
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
              />
              <Error touched={touched.password} message={errors.password} />
              <div className={classes.CheckBoxContainer}>
                <input type="checkbox" className={classes.CheckBox} />
                <span>remember password</span>
              </div>
              {showError ? "invalid username or password" : ""}
              {!isSubmitting ? (
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={classes.SubmitButton}
                >
                  sign in
                </button>
              ) : (
                <Spinner />
              )}
            </form>
            <Signup />
          </div>
        </div>
      )}
    </Formik>
  );
};
export default Login;
