import React from "react";
import classes from "./Product.module.css";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
const Product = React.memo(
  ({ image, sDescription, productName, brandName, upcId, price }) => {
    console.log(typeof price, "price");
    const history = useRouteMatch();

    return (
      <Link to={`/products/${upcId}`} className={classes.ProductContainerLink}>
        <div className={classes.ProductContainer}>
          <div className={classes.ProductName}>{productName}</div>
          <img src={image} />
          <p style={{ padding: 0, margin: 0 }}>{brandName}</p>
          <span style={{ color: "#1a62a3", padding: 0, margin: 0 }}>
            ${price == "" ? " unknown" : price}
          </span>
        </div>
      </Link>
    );
  }
);

export default Product;
