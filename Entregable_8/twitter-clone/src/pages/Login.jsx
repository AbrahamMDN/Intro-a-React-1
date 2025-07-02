/* Importación de hooks */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Creación de una función que permite el inicio de sesión */
const Login = ({ onLogin }) => {

  // Inicialización de estados
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Función que previene el envío por default del registro, previene el login vacío y redirige a la página principal al iniciar sesión
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") return;
    onLogin(username);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="loginbutton">Iniciar sesión</button>
    </form>
  );
};

export default Login;