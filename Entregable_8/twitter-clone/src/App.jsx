/* Importación de hooks, componentes de react-router-dom, componentes funcionales y estilos */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import NotFound from './Components/NotFound';
import './App.css';

/* Creación de la función principal */
const App = () => {
  // Inicialización de estado: No hay usuarios al inicio
  const [user, setUser] = useState(null);

  // Efecto que trae de la memoria local los usuarios registrados desde el montaje
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función que guarda la información de los usuarios en la memoria local y la actualiza en el estado
  const login = (username) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función que elimina información del usuario del estado y de la memoria local  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      {/* Barra de navegación */}
      <Navbar user={user} logout={logout} />
      {/* Rutas */}
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home user={user} logout={logout} />} />
        <Route
          path="/profile"
          element={user ? <Profile user={user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
