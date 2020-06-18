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
  const runningWhere = process.env.NODE_ENV;
  const [howManyToLoad, setHowManyToLoad] = useState(8);

  useEffect(() => {
    const jwt = getJwt();
    if (!jwt) {
      history.push("/login");
    }
    axios
      .get(
        runningWhere === "development"
          ? "http://localhost:5000/api/products"
          : "/api/products",
        { headers: { Authorization: jwt } }
      )
      .then(result => {
        const cleanedData = result.data.data.slice(0, 200);
        dispatch({
          type: "ADD_ALL_PRODUCTS",
          payload: { allProducts: cleanedData }
        });
      })
      .catch(err => null));
  }, []);
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
          style={{
            width: "80%",
            marginLeft: "10%",
            marginTop: "1rem",
            backgroundColor: "#1a62a3",
            color: "white",
            fontSize: "1.1em"
          }}
          onClick={() => setHowManyToLoad(last => last + 8)}
        >
          load more
        </button>
      </div>
    </>
  );
};

export default Products;
