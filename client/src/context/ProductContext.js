import React, { createContext, useReducer } from "react";

export const ProductContext = createContext();
const initialState = {
  products: [],
  singleProduct: {},
  cartProducts: []
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload.allProducts
      };
    case "ADD_SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: action.payload.singleProduct
      };

    //////COME BACK TO THIS AND FIX THE TWO MEHTODS BELOW
    case "ADD_CHECKOUT_PRODUCTS":
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload.newProducts]
      };
    case "SUBTRACT_CHECKOUT_PRODUCTS":
      return {
        ...state,
        cartProducts: state.cartProducts.slice(0, state.cartProducts.length - 1)
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
