import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Order } from "./Order";
import { Header } from "./Header";
import { PizzaOfTheDay } from "./PizzaOfTheDay";
import { CartProvider } from "./contexts";

const App = () => {
  return (
    <div>
      <CartProvider>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </CartProvider>
    </div>
  );
};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
