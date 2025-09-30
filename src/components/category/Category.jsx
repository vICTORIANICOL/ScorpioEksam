import { Link } from "react-router-dom";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import styles from "./category.module.css";

export default function Category() {
  const { categories, catIsLoading, catError } = useFetchCategories();

  if (catIsLoading) return <p>Loading categories...</p>;
  if (catError) return <p>{catError}</p>;

  return (
    <section className={styles.categories}>
      {categories.map((cat) => (
        <Link
          to={`/category/${encodeURIComponent(cat.name)}`} // encode category name
          key={cat._id}
          className={styles.catCard}
        >
          <img src={cat.image} alt={cat.name} className={styles.catImg} />
          <span className={styles.catText}>{cat.name}</span>
        </Link>
      ))}
    </section>
  );
}
