/* Importación del componente Link */
import { Link } from "react-router-dom";

/* Creación de una función que maneja los enlaces y botones de la barra de navegación */
const Navbar = ({ user, logout }) => {
  return (
    <nav>
      {/* Enlaces fijos */}
      <Link to="/">Inicio</Link>
      {user && <Link to="/profile">Perfil</Link>}
      {/* Enlace variable: si no hay una sesión iniciada redirige a la pagina de login. Si la hay, muestra un botón para cierre de sesión */}
      {!user ? (
        <Link to="/login">Iniciar sesión</Link>
      ) : (
        <button onClick={logout} >Cerrar sesión</button>
      )}
    </nav>
  );
};

export default Navbar;