import React, { useState } from "react";

function Profile() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [portfolio, setPortfolio] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter ici la logique pour envoyer les données au serveur, y compris le fichier portfolio.
    console.log("Formulaire soumis:", { nom, email, message, portfolio });
  };

  return (
    <div>
      <h1>Personnal Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom">Name:</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="portfolio">Portfolio:</label>
        <input
          type="file"
          id="portfolio"
          onChange={(e) => setPortfolio(e.target.files[0])}
          accept=".pdf,.doc,.docx,.txt"
          required
        />
        <br />
        <br />

        <label htmlFor="message">Message:</label>
        <br />
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          cols="50"
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Profile;
