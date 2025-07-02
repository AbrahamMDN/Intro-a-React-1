/* Importación de hooks */
import { useEffect, useState } from "react";

/* Creación de una función que maneja el diseño de un tweet*/
const Tweet = ({ tweet, onLike }) => {

  // Inicialización de estado para la foto del usuario: por default es null
  const [profileImage, setProfileImage] = useState(null);

  // Efecto que permite la carga de la foto del autor del tweet desde la memoria local y la actualiza en su estado
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("userProfileImages")) || {};
    const image = storedImages[tweet.author];
    if (image) {
      setProfileImage(image);
    }
  }, [tweet.author]);

  return (
    <div className="tweet">

      {/* Se muestra la foto de perfil del usuario si la hay */}
      {profileImage && (
        <img
          src={profileImage}
          alt="foto de perfil"
        />
      )}

     {/* Contenido del tweet: Texto, autor y botón de like con conteo */}
      <div>
        <p>{tweet.text}</p>
        {tweet.author && <small>Publicado por: {tweet.author}</small>}
        <button onClick={() => onLike(tweet.id)} className="likebutton">

          ❤ {tweet.likes}

        </button>
      </div>
      
    </div>

  );

};

export default Tweet;