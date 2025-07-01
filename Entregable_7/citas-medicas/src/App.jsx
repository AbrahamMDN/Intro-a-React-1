/* Importación de componentes de react-router-dom y hooks */
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

/* Importación de componentes funcionales, estilos globales y función para obtener datos desde una API simulada */
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import NuevaCita from './pages/NuevaCita';
import EditarCita from './pages/EditarCita';
import NotFound from './pages/NotFound';
import { obtenerCitas } from './api/fakeApi';
import CalendarioCitas from './pages/CalendarioCitas';
import './styles/Design.css';

/* Creación de la función principal */
function App() {
  // Inicialización de estado de las citas
  const [citas, setCitas] = useState([]);
  // Elemento que evita guardar citas vacías al inicio
  const primerRender = useRef(true); 

  // Efecto que permite cargar citas al montar
  useEffect(() => {
    // Carga asincrónica manejando errores con try / catch
    const cargarCitas = async () => {
      try {
        // Solicitud de citas guardadas en memoria local
        const citasGuardadas = localStorage.getItem('citas');
        if (citasGuardadas !== null) {
          const parsed = JSON.parse(citasGuardadas);
          // Verificación en consola si se cargaron citas parseadas y actualización de estado de citas
          if (Array.isArray(parsed)) {
            console.log('Cargando citas desde localStorage:', parsed);
            setCitas(parsed);
            // Si ya se han cargado citas, no continuar a la solicitud a la API
            return; 
          }
        }
        // Si no hay citas guardadas, se simula la carga de datos desde la API simulada
        console.log('No hay citas en localStorage. Cargando desde API...');
        // Espera por la respuesta de la API y guardado de la información en memoria local
        const data = await obtenerCitas();
        setCitas(data);
        localStorage.setItem('citas', JSON.stringify(data));
      } catch (error) {
        // Manejo de errores
        console.error('❌ Error al cargar citas:', error);
        setCitas([]);
      }
    };
    // Ejecución de la función de carga de citas
    cargarCitas();
  }, []);

  // Efecto que permite guardar citas en memoria local cuando estas se actualizan (excepto en el primer render)
  useEffect(() => {
    if (primerRender.current) {
      // Exclusión del primer render
      primerRender.current = false;
      return;
    }
    // Guardado de datos en memoria local y verificación por consola
    console.log('Guardando citas en localStorage', citas);
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas]);

  // Función para agregar una nueva cita
  const agregarCita = (nuevaCita) => {
    setCitas((p) => [...p, nuevaCita]);
  };

  // Función para eliminar una cita por ID
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  // Función para actualizar una cita existente que fue editada
  const actualizarCita = (citaEditada) => {
    const nuevasCitas = citas.map((cita) =>
      cita.id === citaEditada.id ? citaEditada : cita
    );
    setCitas(nuevasCitas);
  };

  return (
    <BrowserRouter>
    {/* Elementos de navegación */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Inicio</Link> |{' '}
        <Link to="/citas">Ver Citas</Link> |{' '}
        <Link to="/calendario">Calendario</Link> |{' '}
        <Link to="/nueva">Nueva Cita</Link>
      </nav>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas citas={citas} eliminarCita={eliminarCita} />} />
        <Route path="/cita/:id" element={<CitaDetalle citas={citas} />} />
        <Route path="/calendario" element={<CalendarioCitas citas={citas} />} />
        <Route path="/nueva" element={<NuevaCita agregarCita={agregarCita} />} />
        <Route
          path="/editar/:id"
          element={<EditarCita citas={citas} actualizarCita={actualizarCita} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;