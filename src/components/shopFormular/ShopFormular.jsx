import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import styles from "./shopFormular.module.css";

export default function ShopFormular({ cart, removeFromCart, updateQuantity, clearCart, }) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(""); //message for order

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (cartItemId) => {
    Swal.fire({
      title: "Er du sikker?",
      text: "Vil du fjerne dette produkt?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5e9a13",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ja, fjern det!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(cartItemId);
      }
    });
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      toast.error("Kurven er tom!");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Indtast en gyldig email!");
      return;
    }

    //order submision of all products in cart

    const orderDetails = {
      email,
      note,
      items: cart,
      total: calculateTotal(),
    };

    // Here you would send orderDetails to your backend via fetch
    console.log("Order details:", orderDetails);

    // here  i send the order to a backend API
    toast.success("Ordre afgivet! Tak for dit køb.");
    console.log("Order details:", { email, note, cart });
    setEmail("");
    setNote("");

    // Reset form
    setEmail("");
    setNote("");

    //  Clear cart all at once
    if (typeof clearCart === "function") {
      clearCart();
    }

    
    
  };

  return (
    <div className={styles.kurvPage}>
      <h1>Bestilling</h1>

      {cart.length === 0 ? (
        <p>Kurven er tom</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.cartItemId} className={styles.kurvItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.kurvImg}
                />

                <div className={styles.itemDetails}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemPrice}>{item.price} kr</p>

                  <div className={styles.quantityControl}>
                    <button onClick={() => updateQuantity(item.cartItemId, -1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, 1)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.cartItemId)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <div className={styles.totalBox}>
            <p>I alt: {calculateTotal()} ,-</p>
          </div>

          <div className={styles.orderBox}>
            <textarea
              placeholder="Besked til bestillingen (valgfrit)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={styles.noteInput}
              style={{width: '342px'}}
            />

            <input
              type="email"
              placeholder="Din Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />

            <button className={styles.submitBtn} onClick={handleOrder}>
              Afgiv ordre
            </button>
          </div>
        </>
      )}
    </div>
  );
}
