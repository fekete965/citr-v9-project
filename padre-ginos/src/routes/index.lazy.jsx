import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="index">
      <div className="index-brand">
        <h1>Padre Gino's</h1>
        <p>Pizza & Art at a location near you</p>
        <ul>
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/past">Past Orders</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
