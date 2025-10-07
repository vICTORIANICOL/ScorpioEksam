import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      
      {/*enables navigation with React Router*/}
      <CartProvider>
        {/*gives all components access to the cart context */}

        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
