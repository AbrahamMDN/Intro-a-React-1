/* Importación de hooks y componentes funcionales */
import { useState, useEffect } from "react";
import TweetList from "../Components/TweetList";
import TweetForm from "../Components/TweetForm";

/* Creación de una función que diseña la pagina principal del sitio */
const Home = ({ user, logout }) => {

  // Inicialización de estados 
  const [tweets, setTweets] = useState([]);
  const [allTweets, setAllTweets] = useState({});
  // Modo visualización inicializado para usario individual por default
  const [viewMode, setViewMode] = useState("user"); 

  // Efecto que recupera los tweets guardados desde la memoria local y los actualiza en el estado 
  useEffect(() => {
    const storedTweets = JSON.parse(localStorage.getItem("tweetsByUser")) || {};
    setAllTweets(storedTweets);
    
    // Si la visualización está en modo usuario individual, se actualizan sus tweets en el estado
    if (user && viewMode === "user"){
      setTweets(storedTweets[user.username] || []);

    // Si la visualización está en modo global, se actualizan todos los tweets en el estado y se ordenan del más reciente al más antiguo
    } else if (viewMode === "global") {
      const all = Object.entries(storedTweets)
        .flatMap(([username, tweets]) =>
          tweets.map((tweet) => ({ ...tweet, author: username }))
        )
        .sort((a, b) => b.id - a.id); 

      setTweets(all);
    }
  }, [user, viewMode]);

  // Creación de una función que añade nuevos tweets y los actualiza en los estados correspondientes
  const addTweet = (text) => {

    // Propiedades de un tweet
    const newTweet = {

      id: Date.now(),

      text,

      likes: 0,

      author: user.username,

    };

    // Actualización de estado para los tweets de cada usuario individual y los añade al estado del feed individual
    if (viewMode === "user") {
      const updatedTweets = [newTweet, ...tweets];
      setTweets(updatedTweets);

      // Función que guarda en la memoria local los tweets actualizados y los añade al estado del feed global
      const updatedAllTweets = {
        ...allTweets, 
        [user.username]: updatedTweets,
      };
      localStorage.setItem("tweetsByUser", JSON.stringify(updatedAllTweets));
      setAllTweets(updatedAllTweets);
    }
  };

  // Función que permite dar likes a tweets
  const likeTweet = (id) => {

    // Si la visualización está en modo usuario, se likea el tweet seleccionado y se actualizan los estados en los campos individual y global del feed. Se guardan los cambios en la memoria local  
    if (viewMode === "user") {
      const updatedUserTweets = tweets.map((tweet) =>
        tweet.id === id ? { ...tweet, likes: tweet.likes + 1 } : tweet
      );

      setTweets(updatedUserTweets);

      const updatedAllTweets = {
        ...allTweets,
        [user.username]: updatedUserTweets,
      };
      localStorage.setItem("tweetsByUser", JSON.stringify(updatedAllTweets));
      setAllTweets(updatedAllTweets);

    // Si la visualización está en modo global, se recorren todos los usuarios registrados y se likea el tweet seleccionado por el usuario activo en la sesión. 
    } else if (viewMode === "global") {
      const updatedAllTweets = { ...allTweets };

      for (const username in updatedAllTweets) {
        updatedAllTweets[username] = updatedAllTweets[username].map((tweet) =>
          tweet.id === id ? {...tweet, likes: tweet.likes + 1 }: tweet
        );
      }

      // Se guardan las actualizaciones en la memoria local y se actualiza el estado del feed global.
      localStorage.setItem("tweetsByUser", JSON.stringify(updatedAllTweets));
      setAllTweets(updatedAllTweets);

      // Se actualizan también los tweets likeados en el estado del feed individual y se ordenan del más reciente al más antiguo
      const updatedFeed = Object.entries(updatedAllTweets)
        .flatMap(([username, tweets]) =>
          tweets.map((tweet) => ({ ...tweet, author: username }))
        )
        .sort((a, b) => b.id - a.id);

      setTweets(updatedFeed);
    }

  };

  /* Funciones que permiten cambiar la visualización del modo usuario al modo global y viceversa */
  const switchToUserView = () => setViewMode("user");
  const switchToGlobalView = () => setViewMode("global");

  return (
    <div className="app-container">
      <h1>Bienvenido a Twitter (X)</h1>
      {/* Se despliega el menú de inicio y el feed solo si hay un inicio de sesión */}
      {user ? (
        <div>
          {/* Saludo y botón para cierre de sesión */}
          <p>Hola, {user.username}!</p>
          <button onClick={logout} className="logoutbutton">Cerrar sesión</button>

          {/* Botones para cambiar la vista del feed*/}
          <div>
            <button onClick={switchToUserView} className="viewbutton">Mis Tweets</button>
            <button onClick={switchToGlobalView} className="viewbutton">Feed Global</button>
          </div>

          {/* Condición que solo permite crear tweets en modo usuario individual */}
          {viewMode === "user" && <TweetForm onAddTweet={addTweet} />}
          {/* Listado de tweets */}
          <TweetList tweets={tweets} onLike={likeTweet} />
        </div>
      ):(
        <div>
          {/* Mensaje mostrado si no hay un inicio de sesión */}
          <p>Inicia sesión para comenzar a tweetear</p>
        </div>
      )}
    </div>
  );
};

export default Home;