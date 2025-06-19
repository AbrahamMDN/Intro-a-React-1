import React from 'react';

const RestartButton = ({ onRestart }) => {
  return (
    <button onClick={onRestart}>
      Reiniciar juego
    </button>
  );
};

export default RestartButton;