/* Importación de hooks, calendario, estilos globales y personalizados del calendario y componente Link */ 
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarioCitas.css';
import { Link } from 'react-router-dom';

/* Función para crear el calendario */
function CalendarioCitas({ citas }) {
  // Fecha inicial como estado
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  // Fecha en formato requerido
  const fechaFormateada = fechaSeleccionada.toISOString().split('T')[0];
  // Filtrado de citas para fechas correspondientes
  const citasDelDia = citas.filter(
    (cita) => cita.fecha === fechaFormateada
  );

  // Función para marcar los días que hay citas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const fecha = date.toISOString().split('T')[0];
      const hayCita = citas.some((cita) => cita.fecha === fecha);
      return hayCita ? 'dia-con-cita' : null;
    }
  };

  return (
    <div className="container">
      <h2>📅 Calendario de Citas</h2>

      <div className="calendario-wrapper">
        <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
        tileClassName={tileClassName}
      />
      </div>

      <h3 style={{ marginTop: '20px' }}>
        Citas para el día: <strong>{fechaFormateada}</strong>
      </h3>

      {/* Despliegue del listado de citas en el día seleccionado si aplica; sino, despliegue de mensaje que lo indica */}
      {citasDelDia.length > 0 ? (
        <ul>
          {citasDelDia.map((cita) => (
            <li key={cita.id} style={{ marginBottom: '10px' }}>
              <strong>{cita.paciente}</strong> — {cita.hora}
              <Link to={`/cita/${cita.id}`} style={{ marginLeft: '10px' }}>
                <button>Ver</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>📭 No hay citas para esta fecha.</p>
      )}
    </div>
  );
}

export default CalendarioCitas;