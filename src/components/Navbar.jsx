import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import BasketIcon from "../assets/basket_icon.png";

export default function Navbar({ isOpen, setIsOpen, cart }) {
  const cartCount = cart.length;

  return (
    <header className="navWrapper">
      <Link to="/">
        <img src={Logo} alt="Logo" className="logoImg" />
      </Link>

      <div className="rightSide">
        <Link to="/checkout" className="basketWrapper">
          <img src={BasketIcon} alt="Kurv" className="basketIcon" />
          {cartCount > 0 && <span className="basketCount">{cartCount}</span>}
        </Link>

        <div className="burger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="44"
              viewBox="0 0 40 44"
              fill="none"
            >
              <path
                d="M40 4.61322L35.9714 0.223881L20 17.6256L4.02857 0.223881L0 4.61322L15.9714 22.0149L0 39.4166L4.02857 43.806L20 26.4043L35.9714 43.806L40 39.4166L24.0286 22.0149L40 4.61322Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="37"
              height="30"
              viewBox="0 0 37 30"
              fill="none"
            >
              <path
                d="M0.299988 29.4878H36.7V24.6585H0.299988V29.4878ZM0.299988 17.4146H36.7V12.5854H0.299988V17.4146ZM0.299988 0.512196V5.34146H36.7V0.512196H0.299988Z"
                fill="white"
              />
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <nav className="navOverlay">
          <ul className="navList">
            <li className="navItem">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Forside
              </Link>
            </li>
            <li className="navItem">
              <Link to="/services" onClick={() => setIsOpen(false)}>
                Personalet
              </Link>
            </li>
            <li className="navItem">
              <Link to="/kontakt" onClick={() => setIsOpen(false)}>
                Kontakt
              </Link>
            </li>
            <li className="navItem">
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                Kurv
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
