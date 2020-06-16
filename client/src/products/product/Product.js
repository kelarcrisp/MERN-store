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
          <p style={{ padding: 0, margin: 0 }}>{brandName}</p>
          <span style={{ color: "red", padding: 0, margin: 0 }}>${price}</span>
        </div>
      </Link>
    );
  }
);

export default Product;
