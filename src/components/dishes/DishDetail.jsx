import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDishes } from "../../hooks/useFetchDishes";
import Header from "../header/Header";
import styles from "./dishDetail.module.css";

export default function DishDetail({ addToCart }) {
  const { id } = useParams();
  const { fetchDishById } = useFetchDishes();
  const [dish, setDish] = useState(null);
  const [selectedSize, setSelectedSize] = useState("normal");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDish = async () => {
      try {
        const data = await fetchDishById(id);

        if (!data) {
          setError("Denne ret blev ikke fundet.");
          return;
        }

        setDish(data);
      } catch (err) {
        setError("Noget gik galt med at hente retten.");
        console.error(err);
      }
    };

    loadDish();
  }, [id, fetchDishById]);

  if (error) return <p>{error}</p>;
  if (!dish) return <p>Loading...</p>;

  const handleAddToCart = () => {
    const price = dish.price?.[selectedSize] ?? dish.price;
    addToCart(dish, selectedSize, price);
  };

  return (
    <>
      <Header dynamicTitle={dish.title} />

      <section className={styles.imageSection}>
        <img src={dish.image} alt={dish.title} className={styles.dishImg} />
      </section>

      <section className={styles.infoSection}>
        <h2 className={styles.dishTitle}>{dish.title}</h2>
        <div className={styles.ingredients}>
          {dish.ingredients?.map((ing, i) => (
            <span key={i}>{ing}</span>
          ))}
        </div>
      </section>

      {dish.price?.family ? (
        <section className={styles.sizeSection}>
          <h3 className={styles.sizeHeading}>Vælg størrelse</h3>

          <div
            className={styles.sizeOption}
            onClick={() => setSelectedSize("normal")}
          >
            <span>Almindelig</span>
            {selectedSize === "normal" && <span>✔</span>}
          </div>

          <div
            className={styles.sizeOption}
            onClick={() => setSelectedSize("family")}
          >
            <span>Familie</span>
            {selectedSize === "family" && <span>✔</span>}
          </div>
        </section>
      ) : (
        <p className={styles.sizeHeading}>Kun Almindelig</p>
      )}

      <section className={styles.priceSection}>
        <h3>Pris</h3>
        <p>{dish.price?.[selectedSize] ?? dish.price} kr</p>
      </section>

      <button onClick={handleAddToCart} className={styles.addBtn}>
        Tilføj {dish.title} til kurven
      </button>
    </>
  );
}
