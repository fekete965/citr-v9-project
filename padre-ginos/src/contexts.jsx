import { createContext, useContext, useState } from "react";

export const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const cartValue = useState([]);

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (context == null) {
    throw new Error("useCartContext must be used within CartProvider");
  }

  return context;
}
