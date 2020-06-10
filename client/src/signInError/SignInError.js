import React from "react";
import classes from "./SignInError.module.css";
const Error = ({ touched, message }) => {
  if (!touched) {
    return <span className={classes.FormMessageInvalid}></span>;
  }
  if (message) {
    return <span className={classes.FormMessageInvalid}>{message}</span>;
  } else {
    return <span className={classes.FormMessageValid}>✅</span>;
  }
};

export default Error;
