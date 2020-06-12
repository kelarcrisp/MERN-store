import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import classes from "./IndividualProductComponent.module.css";
const IndividualProductComponent = () => {
  const { newestState, dispatch } = useContext(ProductContext);

  const history = useHistory();

  console.log(newestState, "in long ass name");
  const idToFind = history.location.pathname.split("/")[2];
  const productToShow = newestState.products.find(x => x.UPC === idToFind);
  console.log(productToShow);
  return (
    <div className={classes.IndividualProductContainer}>
      <div>{productToShow.BrandName}</div>
      <img src={productToShow.Image} />
      <div>{productToShow.SalePrice}</div>
      <div>{productToShow.LongDesc}</div>
    </div>
  );
};

export default IndividualProductComponent;
