import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDishes } from "../../hooks/useFetchDishes";
import Header from "../header/Header";
import styles from "./dishDetail.module.css";
import { useCart } from "../../context/CartContext"; 

export default function DishDetail() {
  const { id } = useParams();
  const { fetchDishById } = useFetchDishes();
  const { addToCart } = useCart(); 
  const [dish, setDish] = useState(null);
  const [selectedSize, setSelectedSize] = useState("normal");
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    const chosenPrice = dish.price?.[selectedSize] ?? dish.price;

    addToCart({
      ...dish,
      selectedSize, 
      price: chosenPrice, 
      basePrice: dish.price, 
    });
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

      <section className={styles.sizeSection}>
        <h3 className={styles.sizeHeading}>Vælg størrelse</h3>

        <div className={styles.dropdownWrapper}>
          <div
            className={styles.sizeSelector}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{selectedSize === "normal" ? "Almindelig" : "Familie"}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 34 34"
              fill="none"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <g clipPath="url(#clip0_1_450)">
                <path
                  d="M10.4975 12.1692L17 18.6575L23.5025 12.1692L25.5 14.1667L17 22.6667L8.5 14.1667L10.4975 12.1692Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_450">
                  <rect width="34" height="34" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {dropdownOpen && (
            <div className={styles.dropdownOptions}>
              <div
                className={styles.sizeOption}
                onClick={() => {
                  setSelectedSize("normal");
                  setDropdownOpen(false);
                }}
              >
                Almindelig {selectedSize === "normal" && <span>✔</span>}
              </div>

              {dish.price?.family && (
                <div
                  className={styles.sizeOption}
                  onClick={() => {
                    setSelectedSize("family");
                    setDropdownOpen(false);
                  }}
                >
                  Familie {selectedSize === "family" && <span>✔</span>}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={styles.priceSection}>
        <h3>Pris</h3>
        <p>{dish.price?.[selectedSize] ?? dish.price} ,-</p>
      </section>

      <button onClick={handleAddToCart} className={styles.addBtn}>
        Tilføj {dish.title} til kurven
      </button>
    </>
  );
}
