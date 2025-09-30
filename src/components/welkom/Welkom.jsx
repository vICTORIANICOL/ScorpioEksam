
import styles from "./welkom.module.css";

export default function Welkom() {
  return (
    <section className={styles.welkomWrapper}>
      <h1 className={styles.title}>Velkommen til Den Glade Skorpe!</h1>
      <p className={styles.description}>
        Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi
        bruger kun de bedste råvarer til både klassiske favoritter og spændende
        specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til
        en lille, personlig pizza eller en stor familiedeling, så finder du det
        hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den,
        hent den og nyd den derhjemme!
      </p>
    </section>
  );
}
