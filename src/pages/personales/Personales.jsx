

import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import styles from "./personales.module.css";
import Header from "../../components/header/Header";
import Welkom from "../../components/welkom/Welkom";

export default function Personales() {
  const { employees, isLoading, error } = useFetchEmployees();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <Welkom
        title="Personalet hos Den Glade Skorpe"
        description="Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer."
      />
      <section className={styles.wrapper}>
        {employees.map((emp) => (
          <div key={emp._id} className={styles.card}>
            <img src={emp.image} alt={emp.name} className={styles.image} />
            <h3 className={styles.name}>{emp.name}</h3>
            <p className={styles.position}>{emp.position}</p>
          </div>
        ))}
      </section>
    </>
  );
}
