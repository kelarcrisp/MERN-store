import React, { useEffect, useContext } from "react";
import axios from "axios";
import { getJwt } from "../helperfunctions/getjwt";
import classes from "./products.module.css";
import NavBar from "../navbar/NavBar";
import Product from "./product/Product";
import { ProductContext } from "../context/ProductContext";
const Products = props => {
  const { history } = props;
  const { newestState, dispatch } = useContext(ProductContext);
  console.log(props, "newtest state");
  useEffect(() => {
    const jwt = getJwt();
    if (!jwt) {
      history.push("/login");
    }
    axios
      .get("http://localhost:5000/products")
      .then(result => {
        const cleanedData = result.data.data.slice(0, 200);
        dispatch({
          type: "ADD_ALL_PRODUCTS",
          payload: { allProducts: cleanedData }
        });
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div className={classes.ProductsContainer}>
      <NavBar />
      {newestState.products.slice(0, 10).map(product => (
        <Product
          key={product.UPC}
          upcId={product.UPC}
          image={product.Image}
          sDescription={product.ShortDesc}
          productName={product.Product}
          brandName={product.BrandName}
        />
      ))}
    </div>
  );
};

export default Products;
