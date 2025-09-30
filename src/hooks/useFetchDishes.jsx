import { useState, useEffect } from "react";

export const useFetchDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [dishError, setDishError] = useState(null);
  const [dishIsLoading, setDishIsLoading] = useState(false);

  // Fetch all dishes
  const fetchDishes = async () => {
    setDishIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/dishes");
      const data = await response.json();
      setDishes(data.data);
      return data.data;
    } catch (err) {
      setDishError("Something went wrong fetching dishes");
      console.error(err);
    } finally {
      setDishIsLoading(false);
    }
  };

  // Fetch dish by ID
  const fetchDishById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`);
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error(err);
    }
  };

  // Create new dish
  const createDish = async (dishData) => {
    setDishIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/dish", {
        method: "POST",
        body: dishData,
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      setDishIsLoading(false);
    }
  };

  // Update dish
  const updateDish = async (dishData) => {
    try {
      const response = await fetch("http://localhost:3042/dish", {
        method: "PUT",
        body: dishData,
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // Delete dish
  const deleteDish = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/dish/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDishes();
  }, []);

  return {
    dishes,
    fetchDishes,
    fetchDishById,
    createDish,
    updateDish,
    deleteDish,
    dishError,
    dishIsLoading,
  };
};
