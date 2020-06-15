import React, { useContext } from "react";
import classes from "./OrderSummary.module.css";
import { ProductContext } from "../../context/ProductContext";
import NavBar from "../../navbar/NavBar";
const OrderSummary = () => {
  const { newestState, dispatch } = useContext(ProductContext);
  const newestStateUnique = Array.from(
    new Set(newestState.cartProducts.map(JSON.stringify))
  ).map(JSON.parse);

  const totalPrice = newestState.cartProducts
    .map(product => product.SalePrice)
    .reduce((total, curr) => total + +curr, 0);

  const uniqueIds = newestStateUnique.map(product => product.UPC);

  const uniqueObj = {};

  const mapped = newestState.cartProducts.forEach(product => {
    uniqueObj[product.UPC] = (uniqueObj[product.UPC] || 0) + 1;
  });

  /*image name price*/
  return (
    <>
      <h2>Order Summary</h2>
      <div className={classes.OrderSummaryContainer}>
        <div className={classes.OrderContainer}>
          {newestStateUnique.map(p => {
            return (
              <div className={classes.SingleOrderContainer} key={p.UPC}>
                <img className={classes.ProductImage} src={p.Image} />
                <p>{uniqueObj[p.UPC]}</p>
                <p className={classes.ProductName}>
                  {p.Product.length > 72
                    ? p.Product.slice(0, 73) + "..."
                    : p.Product}
                </p>
                <p className={classes.ProductPrice}>{p.SalePrice}</p>
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
