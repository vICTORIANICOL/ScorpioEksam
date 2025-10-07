import { useState } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Kurv from "./pages/kurv/Kurv";
import DishDetail from "./components/dishes/DishDetail";
import CategoryDetail from "./components/category/CategoryDetail";
import Category from "./components/category/Category";
import Contact from "./pages/contact/Contact";
import Personales from "./pages/personales/Personales";

// toast notifications
import { ToastContainer } from "react-toastify";

function App() {
 
  const [isOpen, setIsOpen] = useState(false);

  
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/dish/:id", element: <DishDetail /> }, // Dish detail page
    { path: "/checkout", element: <Kurv /> }, // Cart page (Kurv)
    { path: "/category", element: <Category /> },
    { path: "/category/:id", element: <CategoryDetail /> },
    { path: "/kontakt", element: <Contact /> },
    { path: "/personalet", element: <Personales /> },
  ]);

  return (
    <div className="app">
      
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/*Page content changes depending on the route */}
      <div className="content">{routes}</div>

      
      <Footer />

      {/*toast notifications in the bottomright corner */}
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;
