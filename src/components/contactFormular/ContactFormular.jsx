import { useState } from "react";
import styles from "./contactFormular.module.css";

export default function ContactFormular() {
  // State for form inputs
  const [formData, setFormData] = useState({
    //initialize local state
    name: "",
    subject: "",
    description: "",
  });

  // keeps track if the message been sent
  const [successMessage, setSuccessMessage] = useState(false);

  // Updates the formData state whenever an input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //sens post request to the backend, creating a new mesage
      const response = await fetch("http://localhost:3042/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json(); //Parses the server response into a JavaScript object (result)
      if (response.ok && result.status === "ok") {
        //backend confirmed succes
        setSuccessMessage(true);
      } else {
        alert("Noget gik galt, prøv igen.");
      }
    } catch (error) {
      console.error("Fejl ved afsendelse:", error.message);
      alert("Serverfejl, prøv igen senere.");
    }
  };

  const handleClose = () => {
    setSuccessMessage(false);
    setFormData({ name: "", subject: "", description: "" });
  };

  return (
    <>
      <section className={styles.kontakt}>
        {!successMessage ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Navn"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Emne"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Beskrivelse"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <button type="submit">Send</button>
          </form>
        ) : (
          <div className={styles.successBox}>
            <div className={styles.box}>
              <h3>
                Tak for din besked {formData.name}! Vi vender tilbage hurtigst
                muligt.
              </h3>
            </div>

            <button onClick={handleClose}>LUK</button>
          </div>
        )}
      </section>
    </>
  );
}
