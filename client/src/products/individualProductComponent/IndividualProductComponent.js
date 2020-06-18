import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import classes from "./IndividualProductComponent.module.css";
import NavBar from "../../navbar/NavBar";
import axios from "axios";
import GoBackButton from "../../goBackButton/GoBackButton";
const IndividualProductComponent = () => {
  const { newestState, dispatch } = useContext(ProductContext);
  const [localItems, setLocalItems] = useState(0);
  const history = useHistory();
  const runningWhere = process.env.NODE_ENV;
  const idToFind = history.location.pathname.split("/")[2];
  useEffect(() => {
    axios
      .get(
        runningWhere === "development"
          ? "http://localhost:5000/api/products/" + idToFind
          : "/api/products/" + idToFind
      )
      .then(result => {
        dispatch({
          type: "ADD_SINGLE_PRODUCT",
          payload: { singleProduct: result.data.data }
        });
      })
      .catch(err => null);
  }, [localItems]);

  const goBack = () => {
    history.goBack();
  };

  const handleAddToCart = async () => {
    const newCheckoutProduct = {
      ...newestState.singleProduct,
      checkoutId: newestState.singleProduct.UPC + 1
    };
    axios
      .post(
        runningWhere === "development"
          ? "http://localhost:5000/api/userCart"
          : "/api/products",
        newCheckoutProduct
      )
      .then(result => {})
      .catch(err => null);
    setLocalItems(current => current + 1);
    dispatch({
      type: "ADD_CHECKOUT_PRODUCTS",
      payload: { newProduct: newCheckoutProduct }
    });
  };

  const handleSubtractFromCart = () => {
    setLocalItems(current => {
      return localItems <= 0 ? 0 : current - 1;
    });
    dispatch({
      type: "SUBTRACT_CHECKOUT_PRODUCTS"
    });
  };
  return (
    <>
      <NavBar />

      <div className={classes.IndividualProductContainer}>
        <GoBackButton goBack={goBack} />
        <div>
          {newestState.singleProduct.BrandName}{" "}
          <div style={{ textAlign: "center" }}>
            ${newestState.singleProduct.SalePrice}
          </div>
        </div>
        <img src={newestState.singleProduct.Image} />

        <div className={classes.AddItemContainer}>
          <div style={{ textAlign: "center", marginBottom: "0.8rem" }}>
            current item count - {localItems}
          </div>
          <button
            className={classes.AddItemButton}
            onClick={handleSubtractFromCart}
          >
            -
          </button>
          <span className={classes.AddItemText}> Add item to cart </span>
          <button className={classes.AddItemButton} onClick={handleAddToCart}>
            +
          </button>
        </div>

        <div className={classes.LongDesc}>
          {newestState.singleProduct.LongDesc}
        </div>
      </div>
    </>
  );
};

export default IndividualProductComponent;
