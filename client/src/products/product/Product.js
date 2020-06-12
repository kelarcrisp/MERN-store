import React from "react";
import classes from "./Product.module.css";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
const Product = ({ image, sDescription, productName, brandName, upcId }) => {
  const history = useRouteMatch();
  console.log(history);
  return (
    <Link to={`/products/${upcId}`}>
      <div className={classes.ProductContainer}>
        <div>{productName}</div>
        <img src={image} />
        <p>{brandName}</p>
        <p>{sDescription.slice(0, 100)}</p>
      </div>
    </Link>
  );
};

export default Product;
