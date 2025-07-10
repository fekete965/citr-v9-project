import { Link } from "@tanstack/react-router";
import { useCartContext } from "../context/CartProvider";

function Header() {
  const [cart] = useCartContext();

  return (
    <nav>
      <Link to="/">
        <h1 className="logo">Padre Gino's Pizza</h1>
      </Link>
      <div className="nav-cart">
        🛒 <span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}

export { Header };
