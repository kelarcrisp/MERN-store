import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getJwt } from "../helperfunctions/getjwt";
import classes from "./products.module.css";
import NavBar from "../navbar/NavBar";
import Product from "./product/Product";
import { ProductContext } from "../context/ProductContext";
const Products = props => {
  const { history } = props;
  const { newestState, dispatch } = useContext(ProductContext);

  const [howManyToLoad, setHowManyToLoad] = useState(10);
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
  console.log(newestState.products);
  return (
    <>
      <NavBar />
      <div className={classes.ProductsContainer}>
        {newestState.products.slice(0, howManyToLoad).map(product => (
          <Product
            key={product.UPC}
            upcId={product.UPC}
            image={product.Image}
            sDescription={product.ShortDesc}
            productName={product.Product}
            brandName={product.BrandName}
            price={product.SalePrice}
          />
        ))}
        <button
          style={{ width: "80%", marginLeft: "10%" }}
          onClick={() => setHowManyToLoad(last => last + 10)}
        >
          load more
        </button>
      </div>
    </>
  );
};

export default Products;
