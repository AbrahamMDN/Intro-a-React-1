// Importación de estilos y hooks
import { useReducer, useRef, useCallback, useEffect, useState } from "react";
import './styles/CounterGame.css';

// Estado Inicial: incluye contador inicializado en cero, un historial de cambios y un registro de estados del contador
const initialState = { count: 0, history: [], prevCountStates: []}; 

// Definición del reducer: Acciones de incremento, decremento, reset, deshacer y default
function reducer(state, action) {
  switch (action.type) {
    case "increment":{
      const amount = action.payload ?? 1; // Resta por defecto 1
      return { 
        count: state.count + amount, 
        history: [...state.history, `+${amount} (Nuevo valor: ${state.count + amount})`],
        prevCountStates: [...state.prevCountStates, state.count]
      };
    }
    case "decrement":{
      const amount = action.payload ?? 1;
      const newCount = state.count - amount;

       // Condición que evita que el contador sea menor a 0
      if (newCount < 0) return state;

      return { 
        count: newCount, 
        history: [...state.history, `-${amount} (Nuevo valor: ${newCount})`],
        prevCountStates: [...state.prevCountStates, state.count]
      };
    }
    case "reset":
      return initialState;

    case "undo":{
      if (state.prevCountStates.length === 0) return state; // Condición cuando no hay cambios que deshacer

      const pastCount = state.prevCountStates[state.prevCountStates.length - 1];
      return {
        count: pastCount,
        history: state.history.slice(0, -1), // Se elimina la última entrada del historial
        prevCountStates: state.prevCountStates.slice(0, -1) // Se elimina el último estado del contador
      };
    }
    default:
      return state;
  }
}

// Definición del Componente Principal: estados, efectos, optimizadores, estructura
function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const savedState =localStorage.getItem("counterState");
    return savedState ? JSON.parse(savedState):initialState;
  }); // Creación de un historial
  const incrementBtnRef = useRef(null);
  const [incrementValue, setIncrementValue] = useState(1); // Valor inicializado en 1 por default

  // Se enfoca el botón de incremento al renderizar
  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  // Actualización del historial
  useEffect(() => {
    localStorage.setItem("counterState", JSON.stringify(state));
  }, [state]);

  // Función de incremento
  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", payload: incrementValue});
  }, [incrementValue]);
  
  // Función de decremento
  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement", payload: incrementValue});
  }, [incrementValue]);

  return (
  <div className="overlay">
    <div>
      <h2>Contador: {state.count}</h2>
        <div>
          <label>
            Incrementar por:{" "}
            <input
              type="number"
              min="1"
              value={incrementValue}
              onChange={(e) => setIncrementValue(Number(e.target.value))}
            />
          </label>
        </div>
      <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement} disabled={state.count === 0}>-</button>
      <button onClick={() => {
        localStorage.removeItem("counterState");
        dispatch({ type: "reset" });
      }}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: "undo" })} disabled={state.prevCountStates.length === 0}>
        Deshacer
      </button>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  </div> 
  );
}

export default CounterGame;
