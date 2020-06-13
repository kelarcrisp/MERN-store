import React from "react";
import classes from "./Product.module.css";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
const Product = React.memo(
  ({ image, sDescription, productName, brandName, upcId, price }) => {
    const history = useRouteMatch();
    return (
      <Link to={`/products/${upcId}`} className={classes.ProductContainerLink}>
        <div className={classes.ProductContainer}>
          <div className={classes.ProductName}>{productName}</div>
          <img src={image} />
          <p>{brandName}</p>
          <p style={{ color: "red" }}>${price}</p>
        </div>
      </Link>
    );
  }
);

export default Product;
