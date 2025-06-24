import React from 'react';

// Creación del componente que maneja la estructura del botón de reinicio
const RestartButton = ({ onRestart }) => {
  return (
    <button onClick={onRestart}>
      Reiniciar juego
    </button>
  );
};

export default RestartButton;