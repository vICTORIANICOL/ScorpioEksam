import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="overlay"></div>
      <div className="footerContent">
        <img src={logo} alt="scorpio Logo" className="logo" />

        <div className="email">
          <p>Email: gladskorpe@pizzaglad.dk</p>
          <p>Tlf: 12345678</p>
          <p>Adresse: Skorpevej 42, 1234 Pizzabyen</p>
        </div>
      </div>
    </footer>
  );
}
