import { useState, useEffect } from "react";

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3042/employees");
      const data = await response.json();
      setEmployees(data.data);
      return data.data;
    } catch (err) {
      setError("Something went wrong fetching employees");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployeeById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3042/employee/${id}`);
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    setEmployees,
    fetchEmployees,
    fetchEmployeeById,
    error,
    isLoading,
  };
};
