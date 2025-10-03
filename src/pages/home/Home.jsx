import { useState } from "react";
import styles from "./home.module.css";
import Header from "../../components/header/Header";
import Welkom from "../../components/welkom/Welkom";
import HeadingText from "../../components/headingText/HeadingText";

import Dishes from "../../components/dishes/Dishes";
import Category from "../../components/category/Category";
import CategoryDetail from "../../components/category/CategoryDetail";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);//useState-react hook returns an array of two items
  //selectedCategory - curent value of the useState
  //setSelectedCategory - function that allows to update the value of selectedCategory
  return (
    <div className={styles.home}>
      <Header />
      <Welkom
        title="Velkommen til Den Glade Skorpe!"
        description={`Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!`}
      />

      <HeadingText text="Vælg kategori" />
      <Category setSelectedCategory={setSelectedCategory} />
      <CategoryDetail category={selectedCategory} />
      <Dishes />
    </div>
  );
}
