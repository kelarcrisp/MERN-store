import React, { useContext, useEffect, useState } from "react";
import classes from "./OrderSummary.module.css";
import { ProductContext } from "../../context/ProductContext";
import NavBar from "../../navbar/NavBar";
import axios from "axios";
const OrderSummary = () => {
  const { newestState, dispatch } = useContext(ProductContext);
  const runningWhere = process.env.NODE_ENV;
  useEffect(() => {
    axios
      .get(
        runningWhere === "development"
          ? "http://localhost:5000/api/userCart"
          : "/api/products"
      )
      .then(result => {
        const filteredResult = result.data.data.forEach(result => {
          delete result._id;
        });
        dispatch({
          type: "ADD_CHECKOUT_PRODUCTS",
          payload: { newProducts: result.data.data }
        });
      })
      .catch(err => console.log(err));
  }, []);

  const newestStateUnique = Array.from(
    new Set(newestState.cartProducts.map(JSON.stringify))
  ).map(JSON.parse);

  const totalPrice = newestState.cartProducts
    .map(product => product.SalePrice)
    .reduce((total, curr) => total + +curr, 0);

  const uniqueObj = {};

  const mapped = newestState.cartProducts.forEach(product => {
    uniqueObj[product.UPC] = (uniqueObj[product.UPC] || 0) + 1;
  });

  const uniqueIds = newestStateUnique.map(product => product.UPC);

  const itemQuantityUpdated = (event, index, singleProduct, upcId) => {
    const { value } = event.target;
    let dataToContext = [];
    let second = [];
    const updatedQuanityCount = newestState.cartProducts.map((product, i) => {
      if (index === i) {
        let stringified = JSON.stringify(product).repeat(value);
        const regex = /}{/gi;
        const replaced = stringified.replace(regex, "}},{{");
        const filtered = replaced.split("},{");
        const newFiltered = filtered.map(x => JSON.parse(x));
        dataToContext.push(...newFiltered);
      } else {
        second.push(product);
      }
    });

    console.log(dataToContext, "data going to context");
    dispatch({
      type: "CHECKOUT_UPDATE_QUANITY",
      payload: { newData: dataToContext, upcId: upcId }
    });
  };
  useEffect(() => {}, [uniqueObj]);
  // console.log([...filteredProducts, singleProduct], "whats going to context");
  return (
    <>
      <h2>Order Summary</h2>
      <div className={classes.OrderSummaryContainer}>
        <div className={classes.OrderContainer}>
          {newestStateUnique.map((p, index) => {
            return (
              <div className={classes.SingleOrderContainer} key={Math.random()}>
                <select
                  onChange={event =>
                    itemQuantityUpdated(event, index, p, p.UPC)
                  }
                  className={classes.QuantityDropDown}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <img className={classes.ProductImage} src={p.Image} />
                <p>{uniqueObj[p.UPC]}</p>
                <p className={classes.ProductName}>
                  {p.Product.length > 72
                    ? p.Product.slice(0, 73) + "..."
                    : p.Product}
                </p>
                <p className={classes.ProductPrice}>${p.SalePrice} </p>
              </div>
            );
          })}
        </div>

        <hr></hr>
        <div>
          <p>Total before taxes and shipping ${totalPrice.toFixed(2)}</p>
          {/* <p>DISCOUNT | code</p>
          <p>TOTAL | total price</p> */}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
