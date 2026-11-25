import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <Link to="/">Movie App</Link>
      </div>
      <nav className="nav-links" aria-label="Navigazione principale">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/">Elenco</Link>
      </nav>
    </header>
  );
}