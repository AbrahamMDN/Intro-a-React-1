/* Importación de componente funcional */
import Tweet from "./Tweet";

/* Creación de una función que despliega el listado de tweets en el feed a partir del componente funcional Tweet*/
const TweetList = ({ tweets, onLike }) => {

  return (

    <div>

      {tweets.map((tweet) => (

        <Tweet key={tweet.id} tweet={tweet} onLike={onLike} />

      ))}

    </div>

  );

};

export default TweetList;