import Header from "../../components/header/Header";
import styles from "./kurv.module.css";

export default function Kurv({ cart, removeFromCart }) {
  return (
    <>
      <Header />
      <div className={styles.kurvPage}>
        <h1>Bestilling</h1>

        {cart.length === 0 ? (
          <p>Kurven er tom</p>
        ) : (
          <ul className={styles.kurvList}>
            {cart.map((item, i) => (
              <li key={i} className={styles.kurvItem}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.kurvImg}
                />
                <div>
                  <p>{item.title}</p>
                  <p>
                    {item.size} - {item.price} kr
                  </p>
                </div>
                <button onClick={() => removeFromCart(i)}>Fjern</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
