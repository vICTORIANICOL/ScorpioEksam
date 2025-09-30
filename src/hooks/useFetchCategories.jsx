// src/hooks/useFetchCategories.jsx
import { useState, useEffect } from "react";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [catError, setCatError] = useState(null);
  const [catIsLoading, setCatIsLoading] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    setCatIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/categories");
      const data = await response.json();
      setCategories(data.data);
      return data.data;
    } catch (err) {
      setCatError("Something went wrong fetching categories");
      console.error(err);
    } finally {
      setCatIsLoading(false);
    }
  };

  // Fetch category by ID
  const fetchCategoryById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/category/${id}`);
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    fetchCategories,
    fetchCategoryById,
    catError,
    catIsLoading,
  };
};
