import ContactFormular from "../../components/contactFormular/ContactFormular";
import Header from "../../components/header/Header";

import Welkom from "../../components/welkom/Welkom";
import styles from "./contact.module.css";

export default function Contact () {
    return (
      <div className={styles.contactPage}>
        <Header />
        <Welkom
          title="Har du spørgsmål eller ønsker du at bestille din favoritpizza?"
          description="Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!"
          className={styles.welkomContact}
        />
        <ContactFormular />
      </div>
    );
}