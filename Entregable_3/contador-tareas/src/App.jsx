// Importaciones
import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  // Persistencia de datos con localStorage
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  // Definición de estados iniciales con useState 
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtrarFavoritas, setFiltrarFavoritas] = useState(false);
  const [filtrarLargas, setFiltrarLargas] = useState(false);

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas
  
  // Efecto secundario: Actualizar el título del documento cada vez que cambia el total de tiempo
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);  // Se ejecuta cada vez que el tiempo total cambia

  // Efecto secundario: Guardado de Tareas cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Función para agregar una nueva tarea. Se agrega un campo al objeto por si la tarea es favorita
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        favorita: false
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  // Función para seleccionar una tarea como favorita
  const tareaFavorita = (index) => {
    const nuevasTareas = tareas.map((tarea, i) => 
      i === index ? { ...tarea, favorita: !tarea.favorita } : tarea
    );
    setTareas(nuevasTareas);
  };

  // Creación de filtros utilizando useMemo
  const tareasFiltradas = useMemo(() => {
  return tareas.filter(tarea => {
    const cumpleFavorita = filtrarFavoritas ? tarea.favorita : true;
    const cumpleLarga = filtrarLargas ? tarea.duracion > 60 : true;
    return cumpleFavorita && cumpleLarga;
  });
}, [tareas, filtrarFavoritas, filtrarLargas]);

// Formato del html
  return (
    <div className="contenedor">
      <h3>Filtros</h3>
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={filtrarFavoritas} 
            onChange={() => setFiltrarFavoritas(!filtrarFavoritas)} 
          />
          Mostrar solo favoritas
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input 
            type="checkbox" 
            checked={filtrarLargas} 
            onChange={() => setFiltrarLargas(!filtrarLargas)} 
          />
          Mostrar solo tareas {'>'} 60 min
        </label>
      </div>

      <h1>Contador de Tareas</h1>
      <div>
        <input 
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea" 
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Duración en minutos" 
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <h2>Tareas</h2>
      <ul>
        {tareasFiltradas.map((tarea, index) => {
          const originalIndex = tareas.findIndex(t => t === tarea); // encuentra el índice real para eliminar el elemento correcto
          return (
            <li key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span>{tarea.nombre}: {tarea.duracion} minutos
                  {tarea.favorita && ' ⭐'}
                </span>
                  <div>
                    <button onClick={() => tareaFavorita(originalIndex)}>
                      {tarea.favorita ? 'Quitar de favoritos' : 'Marcar como favorita'}
                    </button>
                    <button onClick={() => eliminarTarea(originalIndex)} className="eliminar">
                      Eliminar
                    </button>
                  </div>
              </div>
            </li>
          );
        })}
      </ul>

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  );
}

export default App;
