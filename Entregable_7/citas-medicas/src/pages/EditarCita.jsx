/* Importación de hooks */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

/* Creación de una función para editar citas */
function EditarCita({ citas, actualizarCita }) {
  // Creación de ruta dinámica con useParams
  const { id } = useParams();
  // Inicialización de useNavigate
  const navigate = useNavigate();
  // Búsqueda de cita por ID
  const citaExistente = citas.find((c) => c.id === id);

  // Inicialización de estados 
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  // Efecto para actualización de estados de una cita si esta existe y fue encontrada
  useEffect(() => {
    if (citaExistente) {
      setPaciente(citaExistente.paciente);
      setFecha(citaExistente.fecha);
      setHora(citaExistente.hora);
    }
  }, [citaExistente]);

  // Mensaje si no se encuentra una cita
  if (!citaExistente) {
    return <p>❌ Cita no encontrada</p>;
  }

  // Previene envío default de los cambios
  const manejarSubmit = (e) => {
    e.preventDefault();

    // Requerimiento obligatorio de inputs
    if (!paciente || !fecha || !hora) {
      alert('Todos los campos son obligatorios');
      return;
    }
    // Función para formato de actualización de citas
    const citaActualizada = {
      id,
      paciente,
      fecha,
      hora,
    };
    // Aplicación de la función de actualización y redirección al listado de citas
    actualizarCita(citaActualizada);
    navigate('/citas');
  };

  return (
    <div className="container">
      <h2>Editar Cita</h2>
      {/* Formulario de edición */}
      <form onSubmit={manejarSubmit}>
        <div>
          <label>Paciente:</label>
          <input
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div>
          <label>Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarCita;