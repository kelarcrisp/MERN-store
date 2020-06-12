import React, { createContext, useReducer } from "react";

export const ProductContext = createContext();
const initialState = {
  products: []
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ALL_PRODUCTS":
      return {
        ...initialState,
        products: action.payload.allProducts
      };
  }
};

export const ProductContextProvider = props => {
  const [newestState, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider value={{ newestState, dispatch }}>
      {props.children}
    </ProductContext.Provider>
  );
};
