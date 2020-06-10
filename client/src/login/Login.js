import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./Login.module.css";
import Signup from "../signup/Signup";
import Error from "../signInError/SignInError";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});
const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
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
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("submitted login");
        setSubmitting(true);

        //MAKE API CALL TO CHECK IF THE USERNAME IS ALREADY IN USE
        setTimeout(() => {
          setSubmitting(false);
          resetForm();
        }, 500);
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
            <form id="loginForm" className={classes.Form}>
              <input
                type="text"
                className={classes.InputField}
                placeholder="username"
                name="username"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
              />
              <Error touched={touched.username} message={errors.username} />
              <input
                type="text"
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
              <button
                disabled={isSubmitting || !touched.password}
                type="submit"
                className={classes.SubmitButton}
              >
                sign in
              </button>
            </form>
            <Signup />
          </div>
        </div>
      )}
    </Formik>
  );
};
export default Login;
