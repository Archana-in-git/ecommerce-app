import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  cartItems: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
