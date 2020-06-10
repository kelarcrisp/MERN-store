import React, { useRef } from "react";
import classes from "./Signup.module.css";
const Signup = () => {
  console.log("ref changed");
  return (
    <>
      <form id="signupForm" className={classes.Form}>
        <input
          type="text"
          className={classes.InputField}
          placeholder="email"
          required
        />
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

        <button type="submit" className={classes.SubmitButton}>
          register
        </button>
      </form>
    </>
  );
};

export default Signup;
