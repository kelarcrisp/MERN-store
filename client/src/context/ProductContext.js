import React, { createContext, useReducer } from "react";
import { maxHeaderSize } from "http";

export const ProductContext = createContext();
const initialState = {
  products: [],
  singleProduct: {},
  cartProducts: [],
  checkoutComplete: false
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
      console.log(state, "wooooooo in context");
      return {
        ...state,
        checkoutComplete: false,
        cartProducts: [...action.payload.newProducts]
      };
    case "SUBTRACT_CHECKOUT_PRODUCTS":
      return {
        ...state,
        cartProducts: state.cartProducts.slice(0, state.cartProducts.length - 1)
      };
    case "CHECKOUT_COMPLETE":
      return {
        ...state,
        cartProducts: [],
        checkoutComplete: !state.checkoutComplete
      };
    case "CHECKOUT_COMPLETE_GO_BACK":
      return {
        ...state,
        checkoutComplete: false
      };
    case "CHECKOUT_UPDATE_QUANITY":
      const toKeep = state.cartProducts.filter(product => {
        return product.UPC !== action.payload.upcId;
      });
      console.log(toKeep, "to keep before its deleted");
      console.log(action.payload.newData, "paylaod before its deleted");
      return {
        ...state,
        checkoutComplete: false,
        cartProducts: [...action.payload.newData, ...toKeep]
      };
    default:
      return {
        ...state
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
