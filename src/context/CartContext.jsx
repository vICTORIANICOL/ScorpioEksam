import { createContext, useContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  const addToCart = (product) => {
    setCartItems((prev) => [
      ...prev,
      { ...product, quantity: 1, cartItemId: uuidv4() },
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
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, changeQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
