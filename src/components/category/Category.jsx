
import { useFetchCategories } from "../../hooks/useFetchCategories";
import styles from "./category.module.css";


export default function Category({ setSelectedCategory }) {
  const { categories, catIsLoading, catError } = useFetchCategories();

  if (catIsLoading) return <p>Loading categories...</p>;
  if (catError) return <p>{catError}</p>;

  return (
    <section className={styles.categories}>
      {categories.map((cat) => (
        <div
          key={cat._id}
          className={styles.catCard}
          onClick={() => setSelectedCategory(cat.name)}
        >
          <img src={cat.image} alt={cat.name} className={styles.catImg} />
          <span className={styles.catText}>{cat.name}</span>
        </div>
      ))}
    </section>
  );
}
