import React, { useContext } from "react";
import classes from "./NavBar.module.css";
import { NavLink, Link, useHistory } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
const NavBar = () => {
  const history = useHistory();
  const { newestState, dispatch } = useContext(ProductContext);
  console.log(newestState.cartProducts.length);
  const signout = () => {
    localStorage.removeItem("jwt-token");
    history.push("/signin");
  };
  return (
    <div className={classes.NavBarContainer}>
      <div>logo</div>
      <h2> Kelar's starbucks</h2>
      <div className={classes.NavBarLinks}>
        <NavLink
          checkout-length={newestState.cartProducts.length}
          className={classes.NavBarCheckout}
          to="/checkout"
        >
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
