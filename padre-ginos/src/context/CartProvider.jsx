import { createContext, useContext, useState } from "react";

const CartContext = createContext(undefined);

function CartProvider({ children }) {
  const cartValue = useState([]);

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}

function useCartContext() {
  const context = useContext(CartContext);

  if (context == null) {
    throw new Error("useCartContext must be used within CartProvider");
  }

  return context;
}

export { CartContext, CartProvider, useCartContext };
