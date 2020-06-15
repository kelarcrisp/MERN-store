import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import classes from "./IndividualProductComponent.module.css";
import NavBar from "../../navbar/NavBar";
import axios from "axios";
const IndividualProductComponent = () => {
  const { newestState, dispatch } = useContext(ProductContext);
  const [localItems, setLocalItems] = useState(0);
  const history = useHistory();

  const idToFind = history.location.pathname.split("/")[2];
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${idToFind}`)
      .then(result => {
        dispatch({
          type: "ADD_SINGLE_PRODUCT",
          payload: { singleProduct: result.data.data }
        });
      })
      .catch(err => console.log(err));
  }, [localItems]);

  const goBack = () => {
    history.goBack();
  };

  const handleAddToCart = () => {
    setLocalItems(current => current + 1);
    dispatch({
      type: "ADD_CHECKOUT_PRODUCTS",
      payload: { newProducts: newestState.singleProduct }
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
      <button onClick={goBack}>go back</button>
      <div className={classes.IndividualProductContainer}>
        <div>
          {newestState.singleProduct.BrandName}{" "}
          <div style={{ textAlign: "center" }}>
            {newestState.singleProduct.SalePrice}
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
