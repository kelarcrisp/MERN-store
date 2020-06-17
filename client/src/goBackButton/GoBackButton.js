import React from "react";
import classes from "./GoBackButton.module.css";
const GoBackButton = ({ goBack }) => {
  return (
    <button onClick={goBack} className={classes.GoBackButton}>
      Go Back
    </button>
  );
};

export default GoBackButton;
