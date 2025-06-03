import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  cartItems: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { _id, selectedVariant } = action.payload;

      // Identify items by _id + variant storage
      const existingItem = state.cartItems.find(
        (item) =>
          item._id === _id &&
          item.selectedVariant?.storage === selectedVariant?.storage
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === _id &&
            item.selectedVariant?.storage === selectedVariant?.storage
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
          (item) =>
            !(
              item._id === action.payload._id &&
              item.selectedVariant?.storage ===
                action.payload.selectedVariant?.storage
            )
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (product) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context easily
export const useCart = () => useContext(CartContext);
