/* Importación de hooks */
import { useState } from "react";

/* Creación de una función que diseña la entrada para subir tweets*/
const TweetForm = ({ onAddTweet }) => {

  // Inicialización de estado
  const [text, setText] = useState("");

  // Manejo que evita el envío por default al recargar la página
  const handleSubmit = (e) => {

    e.preventDefault();

    // Si no hay texto no avanza la función
    if (!text.trim()) return;

    // Publicación del tweet y limpieza del input
    onAddTweet(text);

    setText("");

  };

  return (

    <form onSubmit={handleSubmit}>

      <input

        type="text"

        value={text}

        onChange={(e) => setText(e.target.value)}

        placeholder="¿Qué estás pensando?"

      />

      <button type="submit" className="twittebutton">Tweet</button>

    </form>

  );

};

export default TweetForm;