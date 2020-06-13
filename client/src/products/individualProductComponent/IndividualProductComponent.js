import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import classes from "./IndividualProductComponent.module.css";
import NavBar from "../../navbar/NavBar";
import axios from "axios";
const IndividualProductComponent = () => {
  const { newestState, dispatch } = useContext(ProductContext);
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
  }, []);

  const goBack = () => {
    history.goBack();
  };
  return (
    <>
      <NavBar />
      <button onClick={goBack}>go back</button>
      <div className={classes.IndividualProductContainer}>
        <div>{newestState.singleProduct.BrandName}</div>
        <img src={newestState.singleProduct.Image} />
        <div>{newestState.singleProduct.SalePrice}</div>
        <div>{newestState.singleProduct.LongDesc}</div>
      </div>
    </>
  );
};

export default IndividualProductComponent;
