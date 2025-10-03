import { useState } from "react";
import React from "react";
import { useFetchEmployees } from "../../hooks/useFetchEmployees";
import styles from "./BackOffice.module.css";

export default function BackOffice() {
  const { employees, isLoading, error } = useFetchEmployees(); //geting employee data from useFetch
  const [localEmployees, setLocalEmployees] = useState([]); //local state for employee in the UI
  const [form, setForm] = useState({ name: "", position: "", image: null }); // curent value + function to update the value
  const [editId, setEditId] = useState(null);

  // Initialize localEmployees from hook once, loads all employees
  React.useEffect(() => {
    setLocalEmployees(employees);
  }, [employees]);

  // handle changes in the form input text or file
  const handleChange = (e) => {
    if (e.target.name === "image") {
      //for file inpout, store the file object
      setForm({ ...form, image: e.target.files[0] });
    } else {
      //for text input , store the file object
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  // Reset the form fields and exit edit mode
  const resetForm = () => {
    setForm({ name: "", position: "", image: null });
    setEditId(null);
  };

  // Handle form submit (add or update employee)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // Update UI only==with none backend call
      const updated = localEmployees.map((emp) =>
        emp._id === editId
          ? { ...emp, name: form.name, position: form.position }
          : emp
      );
      setLocalEmployees(updated);
      alert("Employee updated (UI only)");
      resetForm();
      return;
    }

    // Add new employee via POST
    try {
      const formDataToSend = new FormData();//js object for constructing form data to send via http
      formDataToSend.append("name", form.name);
      formDataToSend.append("position", form.position);
      if (form.image) formDataToSend.append("image", form.image);

      const response = await fetch("http://localhost:3042/employee", {
        method: "POST",
        body: formDataToSend,
      });

      try {
        const result = await response.json();
        if (response.ok && result.status === "ok") {
          setLocalEmployees([...localEmployees, result.data]);
          alert("Employee added successfully");
        } else {
          console.error(result);
          alert("Something went wrong adding employee");
        }
      } catch {
        alert("Employee added, but could not parse backend response");
      }

      resetForm();
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Server error, try again later");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3042/employee/${id}`, { method: "DELETE" });
      setLocalEmployees(localEmployees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setForm({ name: emp.name, position: emp.position, image: null });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.backOffice}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div className={styles.employeeList}>
        {localEmployees.map((emp) => (
          <div key={emp._id} className={styles.employeeCard}>
            <img src={emp.image} alt={emp.name} />
            <h4>{emp.name}</h4>
            <p>{emp.position}</p>
            <button onClick={() => handleEdit(emp)}>Edit</button>
            <button onClick={() => handleDelete(emp._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
