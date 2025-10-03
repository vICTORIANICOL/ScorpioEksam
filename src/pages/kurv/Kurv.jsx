import Header from "../../components/header/Header";
import styles from "./kurv.module.css";
import { useCart } from "../../context/CartContext";
import ShopFormular from "../../components/shopFormular/ShopFormular";

export default function Kurv() {
  const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart();

  return (
    <div className={styles.kurvPage}>
      <Header />
      <ShopFormular
        cart={cartItems}
        updateQuantity={changeQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}
