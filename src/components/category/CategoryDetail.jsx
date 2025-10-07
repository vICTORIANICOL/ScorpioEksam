import { Link } from "react-router-dom"; //compon to nav through app
import { useEffect, useState } from "react";//useeffect react hook to run side effects and use state for state, stores filtered dishes for selected category
import { useFetchDishes } from "../../hooks/useFetchDishes";
import styles from "./categoryDetail.module.css";

export default function CategoryDetail({ category }) { //category prop passed from Category, tells what category to show
  const { dishes, dishIsLoading } = useFetchDishes();//fetches all dishes and loading state
  const [filtered, setFiltered] = useState([]); //state to hold filtered dishes for selected category

  useEffect(() => {//runs when category or dishes change
    if (!category || dishes.length === 0) return;

    setFiltered(dishes.filter((dish) => dish.category === category));//filter dishes so only those dishes to selected category are shown
  }, [category, dishes]);

  if (!category) return null;//doesnt reneder anything if no category is selected
  if (dishIsLoading) return <p>Loading...</p>; //shows loading while dishes are being fetched
  if (!filtered.length) return <p>Ingen retter i denne kategori.</p>;//shows msg if no dishes in selected category

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
