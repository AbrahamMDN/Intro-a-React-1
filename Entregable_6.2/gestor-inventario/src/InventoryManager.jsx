// Importación de estilos y hooks
import { useReducer, useRef, useCallback, useState, useEffect} from "react";
import './InventoryManager.css';

// Estado Inicial: Lista de productos vacía
const initialState = { products: [] };

// Definición del reducer: Acciones de adición, incremento, decremento, remover, limpiar, selección de favorito y default
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { 
        products: [...state.products, { 
          id: Date.now(), 
          name: action.name, 
          quantity: 1,
          favorite: false
        }] 
      };
    case "increment":
      return { 
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: p.quantity + (action.amount || 1) } : p /*Adición de la cantidad seleccionada, o 1 por default */
        ) 
      };
    case "decrement":
      return { 
        products: state.products.map(p =>
          p.id === action.id ? { ...p, quantity: Math.max(1, p.quantity - (action.amount || 1))} : p
        ) 
      };
    case "remove":
      return { 
        products: state.products.filter(p => p.id !== action.id) 
      };
    case "clear":
      return { products: [] };
    case "toggle_favorite":
      return {
        products: state.products.map(p =>
          p.id === action.id ? { ...p, favorite: !p.favorite } : p
        )
      };
    default:
      return state;
  }
}

// Definición del Componente Principal: estados, efectos, acciones, optimizadores, estructura
function InventoryManager() {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const stored = localStorage.getItem("inventory");
    try {
        return stored ? { products: JSON.parse(stored) } : { products: [] };
    } catch {
        return { products: [] };
    }
  }); // Inicialización del localstorage
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({}); // Incremento-Decremento inicializado en cero
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false); // Elementos inicializados sin favoritos
  const inputRef = useRef(null);

  // Guarda los cambios en localStorage cada vez que se modifica el inventario
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(state.products));
  }, [state.products]);

  // Función de adición de productos
  const handleAddProduct = () => {
    if (inputRef.current.value.trim() !== "") {
      dispatch({ type: "add", name: inputRef.current.value.trim()});
      inputRef.current.value = ""; // Limpia el input después de añadir el producto
    }
  };

  // Función de vaciar el inventario: Muestra un mensaje de confirmación
  const handleClearInventory = () => {
    const confirm = window.confirm("¿Estás seguro de que deseas vaciar el inventario?");
    if (confirm) {
        dispatch({ type: "clear" });
        localStorage.removeItem("inventory");
    }
  };

  // Función para la definición del incremento-decremento
  const handleQuantityChange = (id, value) => {
    const parsed = parseInt(value, 10);
    setQuantities(p => ({
      ...p,
      [id]: isNaN(parsed) ? "" : parsed
    }));
  };

  // Función de incremento
  const handleIncrement = useCallback((id, amount) => {
    const parsedAmount = parseInt(amount, 10);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
        dispatch({ type: "increment", id, amount: parsedAmount});
    }
  }, []);
  
  // Función de decremento
  const handleDecrement = useCallback((id, amount) => {
    const parsedAmount = parseInt(amount, 10);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
        dispatch({ type: "decrement", id, amount: parsedAmount});
    }
  }, []);

  // Función para filtrar productos: por nombre y por selección como favoritos
  const filteredProducts = state.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
   .filter(product => !showOnlyFavorites || product.favorite);

  return (
    <div>
      <h2>Gestor de Inventario</h2>

      {/*Input para agregar producto*/}
      <input ref={inputRef} type="text" placeholder="Nombre del producto" />
      <button onClick={handleAddProduct}>Agregar Producto ➕</button>

      {/* Input para buscar producto */}
      <input 
        type="text" 
        placeholder="Buscar producto..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{ marginLeft: "10px" }}
      />

      {/* Selección de Favoritos */}
      <label style={{ marginLeft: '10px' }}>
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={(e) => setShowOnlyFavorites(e.target.checked)}
        />
        Mostrar solo favoritos ⭐
      </label>

      {/* Botón para vaciar inventario */}
      <button 
        onClick={handleClearInventory} 
        style={{ marginLeft: "10px"}}
      >
        Vaciar Inventario 🗑️
      </button>

      {/* Listado de Productos */}
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {/* Selector de Producto Favorito */}
            <span style={{ marginRight: "8px", cursor: "pointer" }} onClick={() => dispatch({ type: "toggle_favorite", id: product.id })}>
              {product.favorite ? "★" : "☆"}
            </span>
            {product.name} - Cantidad: {product.quantity}
            {/* Definición del incremento-decremento */}
            <input
              type="number"
              placeholder="Cantidad"
              value={quantities[product.id] || ""}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              style={{ width: "50px", marginLeft: "10px" }}
              min="1"
            />
            <button onClick={() => handleIncrement(product.id, quantities[product.id] || 1)}>+</button>
            <button onClick={() => handleDecrement(product.id, quantities[product.id] || 1)}>-</button>
            <button onClick={() => dispatch({ type: "remove", id: product.id })}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryManager;