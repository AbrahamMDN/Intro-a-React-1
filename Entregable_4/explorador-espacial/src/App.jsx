// App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';
import './App.css';

function App() {
  // Estado inicial
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [contadorPlanetas, setContadorPlanetas] = useState(1); // Para enumerar planetas visitados

  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje: Panel iniciado

    const intervalo = setInterval(() => { // Montaje: Simulación de vuelo
      setDistancia(d => d + 10);
      setCombustible(c => {
        const nuevoCombustible = c - 5;
        if (nuevoCombustible <= 0) {
          clearInterval(intervalo);
          setEstadoNave("Sin combustible");
          return 0;
        }
        return nuevoCombustible;
      });
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje: Limpieza de simulacion de vuelo
      console.log("El panel se ha apagado."); // Desmontaje: Apagado del panel
    };
  }, []);

  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización: Combustible restante durante vuelo
  }, [combustible]);

  const mensajeEstado = useMemo(() => { //Estado de la nave durante vuelo
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => { // Función de aterrizaje y registro de planetas visitados
    setEstadoNave("Aterrizando");

    const nuevoPlaneta = `Planeta-${contadorPlanetas}`;
    setPlanetasVisitados(p => [...p, nuevoPlaneta]);
    setContadorPlanetas(p => p + 1);
  };

  return (
    <div className="panel">
      <h2 className="blink"><i className="fas fa-space-shuttle"></i>{mensajeEstado}</h2>
      <p><i className="fas fa-route"></i> Distancia: {distancia}</p>
      <p className={combustible <= 20 ? "alerta" : ""}>
        <i className="fas fa-gas-pump"></i> Combustible: {combustible}</p>
      <button onClick={aterrizar} disabled={combustible <= 0}>
        Aterrizar
      </button>

      <div className="radar">
        <div className="radar-line"></div>
      </div>

      <h3><i className="fas fa-globe"></i> Planetas visitados:</h3>
      {planetasVisitados.map((planeta, index) => (
        <Planeta key={index} nombre={planeta} />
      ))}
    </div>
  );
}

export default App;