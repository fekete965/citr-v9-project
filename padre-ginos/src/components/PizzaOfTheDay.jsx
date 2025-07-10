import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function PizzaOfTheDay() {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (pizzaOfTheDay == null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <p className="pizza-of-the-day-price">
            From {intl.format(pizzaOfTheDay.sizes.S)}
          </p>
        </div>
        <img
          alt={pizzaOfTheDay.name}
          className="pizza-of-the-day-image"
          src={pizzaOfTheDay.image}
        />
      </div>
    </div>
  );
}

export { PizzaOfTheDay };
