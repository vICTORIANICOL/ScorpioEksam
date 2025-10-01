import { useState } from "react";
import styles from "./home.module.css";
import Header from "../../components/header/Header";
import Welkom from "../../components/welkom/Welkom";
import HeadingText from "../../components/headingText/HeadingText";

import Dishes from "../../components/dishes/Dishes";
import Category from "../../components/category/Category";
import CategoryDetail from "../../components/category/CategoryDetail";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className={styles.home}>
      <Header />
      <Welkom />
      <HeadingText text="Vælg kategori" />
      <Category setSelectedCategory={setSelectedCategory} />
      <CategoryDetail category={selectedCategory} />
      <Dishes />
    </div>
  );
}
