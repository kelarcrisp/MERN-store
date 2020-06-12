import React from "react";
import classes from "./NavBar.module.css";
import { NavLink, Link, useHistory } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  const signout = () => {
    localStorage.removeItem("jwt-token");
    history.push("/login");
  };
  return (
    <div className={classes.NavBarContainer}>
      <div>logo</div>
      <h2> Kelar's starbucks</h2>
      <div className={classes.NavBarLinks}>
        <NavLink className={classes.NavBarLink} to="/checkout">
          Checkout
        </NavLink>
        <button onClick={signout} className={classes.NavBarSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
