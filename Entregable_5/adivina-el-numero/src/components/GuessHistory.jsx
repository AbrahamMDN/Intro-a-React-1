import React from 'react';

// Creación del componente que maneja la estructura del historial
const GuessHistory = ({ history }) => {
  if (history.length === 0) return null;

  return (
    <div>
      <h3>Historial de intentos</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            Intento {index + 1}: {item.guess} → {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuessHistory;
