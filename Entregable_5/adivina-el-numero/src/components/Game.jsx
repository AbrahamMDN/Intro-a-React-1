// Importación de componentes funcionales, hooks y estilos
import React, { useState, useEffect } from 'react';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';
import GuessHistory from './GuessHistory';
import '../styles/game.css';

// Definición del Componente Principal: estados, efectos, acciones, estructura
const Game = () => {
  const [secretNumber, setSecretNumber] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([]);

  const MAX_ATTEMPTS = 10;

  // Función que inicializa el número aleatorio
  const generateRandomNumber = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setSecretNumber(random);
    setFeedback('');
    setUserGuess('');
    setAttempts(0);
    setGameOver(false);
    setHistory([]);
  };

  // Ejecuta la función que crea el número aleatorio
  useEffect(() => {
    generateRandomNumber();
  }, []);

  // Manejo del input dado por el usuario
  const handleInputChange = (e) => {
    setUserGuess(e.target.value);
  };

  // Evaluación del input del usuario
  const checkGuess = () => {
    if (gameOver) return;

    const guess = parseInt(userGuess, 10);

    if (isNaN(guess)) {
      setFeedback('Por favor, ingresa un número válido');
      return;
    }

    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);

    let result;
    if (guess === secretNumber) {
      result = '¡Correcto!';
      setFeedback(result);
      setGameOver(true);
    } else if (nextAttempt >= MAX_ATTEMPTS) {
      result = `Has perdido. El número era ${secretNumber}`;
      setFeedback(result);
      setGameOver(true);
    } else if (guess < secretNumber) {
      result = 'El número es mayor';
      setFeedback(result);
    } else {
      result = 'El número es menor';
      setFeedback(result);
    }

    setHistory((p) => [...p, { guess, result }]); // Adición de intentos al historial

  };

  return (
    <div className="game-container">
      <h1>Adivina el número</h1>
      <h2>Intentos: {attempts}</h2>
      <InputNumber value={userGuess} onChange={handleInputChange} onCheck={checkGuess}  disabled={gameOver}/>
      <Message feedback={feedback} />
      <GuessHistory history={history} />
      <RestartButton onRestart={generateRandomNumber} />
    </div>
  );
};

export default Game;