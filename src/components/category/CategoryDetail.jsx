import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchDishes } from "../../hooks/useFetchDishes";
import styles from "./categoryDetail.module.css";

export default function CategoryDetail({ category }) {
  const { dishes, dishIsLoading } = useFetchDishes();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (!category || dishes.length === 0) return;

    setFiltered(dishes.filter((dish) => dish.category === category));
  }, [category, dishes]);

  if (!category) return null;
  if (dishIsLoading) return <p>Loading...</p>;
  if (!filtered.length) return <p>Ingen retter i denne kategori.</p>;

  return (
    <>
      <div className={styles.categoryHeader}>
        <p className={styles.categoryTitle}>
          Alle vores {category}
        </p>
        <section className={styles.dishGrid}>
          {filtered.map((dish) => (
            <Link
              key={dish._id}
              to={`/dish/${dish._id}`}
              className={styles.dishCard}
            >
              <img
                src={dish.image}
                alt={dish.title}
                className={styles.dishImg}
              />
              <span className={styles.dishName}>{dish.title}</span>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
