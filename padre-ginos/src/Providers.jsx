import { CartProvider } from "./context/CartProvider";

function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}

export { Providers };
