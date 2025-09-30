
import styles from "./header.module.css";
import headerImg from "../../assets/headerImg.png";

export default function Header({ dynamicTitle }) {
  return (
    <header className={styles.header}>
      <div className={styles.overlay}></div>
      <img src={headerImg} alt="Header" className={styles.headerImg} />
      <div className={styles.textContainer}>
        <p className={styles.den}>DEN</p>
        <p className={styles.glade}>GLADE</p>
        <p className={styles.skorpe}>{dynamicTitle || "SKORPE"}</p>
      </div>
    </header>
  );
}

