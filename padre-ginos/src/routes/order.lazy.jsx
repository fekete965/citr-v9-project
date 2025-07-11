import { useState, useEffect } from "react";
import { Pizza } from "../components/Pizza";
import { Cart } from "../components/Cart";
import { useCartContext } from "../context/CartProvider";
import { createLazyFileRoute } from "@tanstack/react-router";
import { formatCurrency } from "../utils/formatCurrency";

export const Route = createLazyFileRoute("/order")({
  component: OrderComponent,
});

function OrderComponent() {
  const [cart, setCart] = useCartContext();
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.id === pizzaType);
    price = formatCurrency(selectedPizza.sizes[pizzaSize]);
  }

  function selectPizzaType(event) {
    setPizzaType(event.target.value);
  }

  function selectPizzaSize(event) {
    setPizzaSize(event.target.value);
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    setCart((prev) => {
      return [
        ...prev,
        {
          pizza: selectedPizza,
          size: pizzaSize,
          price,
        },
      ];
    });
  }

  async function checkout() {
    setLoading(true);

    await fetch("api/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    setCart([]);
    setLoading(false);
  }

  useEffect(() => {
    async function fetchPizzaTypes() {
      const pizzaRes = await fetch("/api/pizzas");
      const pizzaJson = await pizzaRes.json();
      setPizzaTypes(pizzaJson);
      setLoading(false);
    }

    fetchPizzaTypes();
  }, []);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={handleOnSubmit}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                onChange={selectPizzaType}
                value={pizzaType}
              >
                {pizzaTypes.map((pizza) => {
                  return (
                    <option key={pizza.id} value={pizza.id}>
                      {pizza.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    id="pizza-s"
                    name="pizza-size"
                    onChange={selectPizzaSize}
                    type="radio"
                    value="S"
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    id="pizza-m"
                    name="pizza-size"
                    onChange={selectPizzaSize}
                    type="radio"
                    value="M"
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    id="pizza-l"
                    name="pizza-size"
                    onChange={selectPizzaSize}
                    type="radio"
                    value="L"
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {loading ? (
            <h1>loading pizza lol</h1>
          ) : (
            <div className="order-pizza">
              <Pizza
                description={selectedPizza?.description}
                image={selectedPizza?.image}
                name={selectedPizza?.name}
              />
              <p>{price}</p>
            </div>
          )}
        </form>
      </div>
      {loading ? <h2>LOADING...</h2> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
}
