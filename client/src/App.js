import React from "react";
import "./App.css";
import Login from "./login/Login";
import Products from "./products/Products";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/signin" exact component={Login} />
          <Route path="/products" exact component={Products} />
          <Redirect from="/" to="/signin" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
