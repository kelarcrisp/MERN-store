import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import classes from "./Login.module.css";
import { TextField } from "@material-ui/core";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import AccountCircle from "@material-ui/icons/AccountCircle";
// import LockIcon from "@material-ui/icons/Lock";
// import Button from "@material-ui/core/Button";
import Signup from "../signup/Signup";
// import Error from "./Error/Error";
// the keys here should be the same as the values as the initialValues we give to Formik

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
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
            required
          />
          <input
            type="text"
            className={classes.InputField}
            placeholder="password"
            required
          />
          <div className={classes.CheckBoxContainer}>
            <input type="checkbox" className={classes.CheckBox} />
            <span>remember password</span>
          </div>
          <button type="submit" className={classes.SubmitButton}>
            sign in
          </button>
        </form>
        <Signup />
      </div>
    </div>
  );
};
export default Login;
