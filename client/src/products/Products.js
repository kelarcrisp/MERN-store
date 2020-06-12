import React, { useEffect } from "react";
import axios from "axios";
const Products = () => {
  // useEffect(() => {}, []);

  async function test() {
    axios
      .get("http://localhost:5000/products")
      .then(result => console.log(result))
      .catch(err => console.log(err.message));
  }
  return (
    <div>
      hi im products!
      <button style={{ width: "200px" }} onClick={test}>
        button
      </button>
    </div>
  );
};

export default Products;
