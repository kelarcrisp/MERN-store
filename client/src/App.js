import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";

import Products from "./products/Products";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getJwt } from "./helperfunctions/getjwt";
import NavBar from "./navbar/NavBar";
import Checkout from "./checkout/Checkout";
import { ProductContextProvider } from "./context/ProductContext";
import IndividualProductComponent from "./products/individualProductComponent/IndividualProductComponent";
import LoadingPlaceholder from "./loadingPlaceholder/LoadingPlaceholder";
const Login = lazy(() => import("./login/Login"));
function App() {
  return (
    <Suspense fallback={LoadingPlaceholder}>
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
              <Route
                exact
                path="/"
                render={() =>
                  !getJwt() ? <Redirect to="/signin" /> : <Products />
                }
              />
            </ProductContextProvider>
          </Switch>
        </>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
