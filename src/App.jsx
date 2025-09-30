import { useState } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Kurv from "./pages/kurv/Kurv";
import DishDetail from "./components/dishes/DishDetail";
import CategoryDetail from "./components/category/CategoryDetail";
import Category from "./components/category/Category";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [cart, setCart] = useState([]);

  const addToCart = (dish, size, price) => {
    setCart([...cart, { ...dish, size, price }]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // Routes
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dish/:id", element: <DishDetail addToCart={addToCart} /> },
    {
      path: "/checkout",
      element: <Kurv cart={cart} removeFromCart={removeFromCart} />,
    },
    { path: "/category", element: <Category /> },
    { path: "/category/:id", element: <CategoryDetail /> },
  ]);

  return (
    <div className="app">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} cart={cart} />

      <div className="content">{routes}</div>
      <Footer />
    </div>
  );
}

export default App;
