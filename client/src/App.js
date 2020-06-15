import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./login/Login";
import Products from "./products/Products";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getJwt } from "./helperfunctions/getjwt";
import NavBar from "./navbar/NavBar";
import Checkout from "./checkout/Checkout";
import { ProductContextProvider } from "./context/ProductContext";
import IndividualProductComponent from "./products/individualProductComponent/IndividualProductComponent";
function App() {
  return (
    <BrowserRouter>
      <>
        <Switch>
          <ProductContextProvider>
            <Route path="/signin" exact component={Login} />
            <Route
              path="/products/:id"
              component={IndividualProductComponent}
            />
            <Route path="/products" exact component={Products} />

            <Route path="/checkout" exact component={Checkout} />
            {/* <Redirect exact from="/" to="/signin" component={Login} /> */}
          </ProductContextProvider>
        </Switch>
      </>
    </BrowserRouter>
  );
}

export default App;
