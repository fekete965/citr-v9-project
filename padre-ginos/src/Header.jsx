import { useCartContext } from "./contexts";

function Header() {
  const [cart] = useCartContext();

  return (
    <nav>
      <h1 className="logo">Padre Gino's Pizza</h1>
      <div className="nav-cart">
        🛒 <span className="nav-cart-number">{cart.length}</span>
      </div>
    </nav>
  );
}

export { Header };
