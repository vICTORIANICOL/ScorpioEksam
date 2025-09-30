import { Link } from "react-router-dom";
import { useFetchDishes } from "../../hooks/useFetchDishes";
import styles from "./dishes.module.css";

export default function Dishes() {
  const { dishes, dishIsLoading } = useFetchDishes();

  
  const selectedIds = [
    "68da3745c774c2c4de85e372", // Parma Drama
    "68da3745c774c2c4de85e374", // Rabbit Royale
    "68da3745c774c2c4de85e376", // Shrimp Supreme
    "68da3745c774c2c4de85e37e", // Spaghetti Galaxi
    "68da3745c774c2c4de85e38e", // Durum Devotion
    "68da3745c774c2c4de85e38c", // Durum Dynamite
    "68da3745c774c2c4de85e380", // Saucy Spaceship
    "68da3745c774c2c4de85e382", // Cosmic Clam
    "68da3745c774c2c4de85e38a", // Cheddar Chiller
  ];

  const filtered = dishes.filter((d) => selectedIds.includes(d._id));

  if (dishIsLoading) return <p>Loading...</p>;

  return (
    <section className={styles.dishesGrid}>
      {filtered.map((dish) => (
        <Link
          key={dish._id}
          to={`/dish/${dish._id}`}
          className={styles.dishCard}
        >
          <img src={dish.image} alt={dish.title} className={styles.dishImg} />
          <p className={styles.dishTitle}>{dish.title}</p>
        </Link>
      ))}
    </section>
  );
}
