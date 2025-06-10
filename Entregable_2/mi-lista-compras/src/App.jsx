import { useState } from 'react';
import './App.css';

function ListaCompras() {
  // Definir el estado para la lista de compras
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  // Función para agregar un nuevo producto a la lista
  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      const nuevo = { nombre: nuevoProducto, favorito: false };
      setProductos([...productos, nuevo]);
      setNuevoProducto("");
    }
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (index) => {
    const productosActualizados = productos.filter((_, i) => i !== index);
    setProductos(productosActualizados);
  };

  // Función para agregar un producto como favorito
  const toggleFavorito = (index) => {
    const productosActualizados = productos.map((producto, i) =>
      i === index ? { ...producto, favorito: !producto.favorito } : producto
    );
    setProductos(productosActualizados);
  };

  return (
    <div className="list-container">
      <h2 className="title">🛒 Lista de Compras</h2>
      <div className="input-group">
        <input
          type="text"
          className="input-text"
          placeholder="Añade un producto..."
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
        />
        <button className="btn-add" onClick={agregarProducto}>Agregar</button>
      </div>
      <ul className="list-products">
        {productos.map((producto, index) => (
          <li key={index} className={`item-producto ${producto.favorito ? 'favorito' : ''}`}>
            <span>{producto.nombre}</span>
            <div className="actions">
              <button
                className="btn-fav"
                onClick={() => toggleFavorito(index)}
                title={producto.favorito ? "Quitar de favoritos" : "Marcar como favorito"}
              >
                {producto.favorito ? "★" : "☆"}
              </button>
              <button className="btn-delete" onClick={() => eliminarProducto(index)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;