import styles from "./headingText.module.css";

export default function HeadingText({ text }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{text}</h1>
    </div>
  );
}
