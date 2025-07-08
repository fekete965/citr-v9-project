import { createElement } from "react";
import { createRoot } from "react-dom/client";

const Pizza = (props) => {
  return createElement("div", {}, [
    createElement("h1", {}, props.name),
    createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return createElement("div", {}, [
    createElement("h1", {}, "Padre Gino's"),
    createElement(Pizza, {
      name: "The Pepperoni Pizza",
      description: "Mozzarella Cheese, Pepperoni",
    }),
    createElement(Pizza, {
      name: "The Hawaiian Pizza",
      description: "Sliced Ham, Pineapple, Mozzarella Cheese",
    }),
    createElement(Pizza, {
      name: "The Big Meat Pizza",
      description: "Bacon, Pepperoni, Italian Sausage, Chorizo Sausage",
    }),
  ]);
};

const container = document.getElementById("root");

const root = createRoot(container);

root.render(createElement(App));
