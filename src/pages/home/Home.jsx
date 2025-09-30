import styles from "./home.module.css";
import Header from "../../components/header/Header";
import Welkom from "../../components/welkom/Welkom";
import HeadingText from "../../components/headingText/HeadingText";

import Dishes from "../../components/dishes/Dishes";
import Category from "../../components/category/Category";



export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Welkom />
      <HeadingText text="Vælg kategori" />
      <Category />
      <Dishes />
    </div>
  );
}