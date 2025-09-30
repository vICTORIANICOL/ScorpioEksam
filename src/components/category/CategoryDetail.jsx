import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchDishes } from "../../hooks/useFetchDishes";
import styles from "./categoryDetail.module.css";

export default function CategoryDetail() {
  const { id } = useParams(); // this comes from the URL
  const { fetchDishes } = useFetchDishes();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await fetchDishes();
      if (all) {
        const decodedId = decodeURIComponent(id); // decode the category name
        setFiltered(all.filter((dish) => dish.category === decodedId));
      }
    };
    load();
  }, [id, fetchDishes]);

  if (!filtered.length) return <p>Ingen retter i denne kategori.</p>;

  return (
    <section className={styles.dishGrid}>
      {filtered.map((dish) => (
        <Link
          key={dish._id}
          to={`/dish/${dish._id}`}
          className={styles.dishCard}
        >
          <img src={dish.image} alt={dish.title} className={styles.dishImg} />
          <span className={styles.dishName}>{dish.title}</span>
        </Link>
      ))}
    </section>
  );
}
