/* Importación de hooks */
import { useState, useEffect } from "react";

/* Creación de una función que permite diseñar la página del perfil de un usuario individual */
const Profile = ({ user }) => {

    // Función que recupera los tweets del usuario de la memoria local
    const userTweets =
      JSON.parse(localStorage.getItem("tweetsByUser"))?.[user.username] || [];

    // Inicialización del estado para la imagen del usuario: por default está vacío
    const [profileImage, setProfileImage] = useState(null);

    // Efecto que recupera la imagen de la memoria local y actualiza el estado cargando la imagen si esta existe
    useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("userProfileImages")) || {};
      if (stored[user.username]) {
        setProfileImage(stored[user.username]);
      }
    }, [user.username]);

    // Función que interpreta el archivo de imagen subido al sitio y lo guarda en la memoria local
    const handleImageUpload = (e) => {

      // Si la imagen existe, se guarda en una variable; sino, se omite esta función
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;

        // Se recupera la imagen de la memoria local, se guarda en la misma y se actualiza en el estado de la imagen
        const stored = JSON.parse(localStorage.getItem("userProfileImages")) || {};
        stored[user.username] = base64Image;
        localStorage.setItem("userProfileImages", JSON.stringify(stored));

        setProfileImage(base64Image);
      };
      reader.readAsDataURL(file);
    };

  return (
    <div>
      <h1>Perfil</h1>
      {/* Solo hay acceso a esta página si hay una sesión activa */}
      {user && (
        <>
          <p>Nombre de usuario: {user.username}</p>
          {/* Se muestra la foto de perfil del usuario si existe; sino, se indica que no se ha subido una */}
          {profileImage ? (
            <img
              src={profileImage}
              alt="Foto de perfil"
              style={{ width: 120, height: 120, borderRadius: "50%" }}
            />
          ) : (
            <p>No has subido una foto de perfil</p>
          )}

          {/* Entrada para subir una foto de perfil */}
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {/* Conteo de tweets del usuario */}
          <p>Total de tweets: {userTweets.length}</p>
        </>
      )}
    </div>
  );
};

export default Profile;