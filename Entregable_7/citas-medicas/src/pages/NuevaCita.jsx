/* Importación de hooks */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Creación de función para crear una nueva cita */
function NuevaCita({ agregarCita }) {
  // Inicialización de estados
  const [paciente, setPaciente] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const navigate = useNavigate();

  // Previene envío default de los cambios
  const manejarSubmit = (e) => {
    e.preventDefault();

  // Requerimiento obligatorio de inputs
    if (!paciente || !fecha || !hora) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Función para formato de una nueva cita
    const nuevaCita = {
      id: Date.now().toString(),
      paciente,
      fecha,
      hora,
    };

    //Aplicación de la funcion de adición de cita y redirección al listado de citas
    agregarCita(nuevaCita);
    navigate('/citas');
  };

  return (
    <div className="container">
      <h2>Nueva Cita</h2>
      {/* Formulario de creación */}
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
        <button type="submit">Guardar Cita</button>
      </form>
    </div>
  );
}

export default NuevaCita;