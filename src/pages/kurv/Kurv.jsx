import Header from "../../components/header/Header";
import styles from "./kurv.module.css";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function Kurv({ cart, removeFromCart, updateQuantity }) {
  const [email, setEmail] = useState("");

  const calculateTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (index) => {
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
        removeFromCart(index);
        toast.success("Produkt fjernet fra kurven!");
      }
    });
  };

  const handleOrder = () => {
    if (!email.includes("@")) {
      toast.error("Indtast en gyldig email!");
      return;
    }
    toast.success("Ordre afgivet! Tak for dit køb.");
    setEmail("");
  };

  return (
    <>
      <Header />
      <div className={styles.kurvPage}>
        <h1>Bestilling</h1>

        {cart.length === 0 ? (
          <p>Kurven er tom</p>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map((item, i) => (
                <div key={i} className={styles.kurvItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.kurvImg}
                  />

                  <div className={styles.itemDetails}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemPrice}>{item.price} kr</p>

                    <div className={styles.quantityControl}>
                      <button onClick={() => updateQuantity(i, -1)}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(i, 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(i)}
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
    </>
  );
}
