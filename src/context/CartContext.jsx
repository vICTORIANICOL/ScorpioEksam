import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const CartContext = createContext();  // creates a React Context object, a box that can hold data (like the cart) and make it available to any component in my app without needing to pass props down multiple layers

export const useCart = () => useContext(CartContext); //useContext(CartContext) allows to read the data inside any component

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []); /// cart is stored in localStorage, so even if the page refreshes, the cart stays saved
  // cartItems is curent state and setCartItems is function to update the state

  const addToCart = (product) => {
    setCartItems((prev) => [ //react state updater
      ...prev,
      { ...product, quantity: 1, cartItemId: uuidv4() },//adds a new product with a unique id and quatity = 1
    ]);
    toast.success(`${product.title} blev tilføjet til kurven!`);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.cartItemId !== cartItemId)
    );
    toast.info("Produkt fjernet fra kurven.");
  };

  const changeQuantity = (cartItemId, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  //Clear cart all at once

  const clearCart = () => {
    setCartItems([]);
    toast.info("Kurven er nu tømt.");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>  // every component wrapped by CartProvider, can acces this values using useCart()
  );
};
