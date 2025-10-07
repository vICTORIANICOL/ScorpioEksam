import Header from "../../components/header/Header";
import styles from "./kurv.module.css";
import { useCart } from "../../context/CartContext";
import ShopFormular from "../../components/shopFormular/ShopFormular";
//Cart page/checkout
export default function Kurv() {
  const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart(); //useCart gives me acces to the cart context(cartItems, Removefromcart, changequantity.) This conect the page directly to the global cart state

  return (
    <div className={styles.kurvPage}>
      <Header />
      <ShopFormular
        cart={cartItems} //list of items in cart
        updateQuantity={changeQuantity}  //change item quantity
        removeFromCart={removeFromCart} //remove an item
        clearCart={clearCart} //clear the cart after order
      />
    </div>
  );
}
