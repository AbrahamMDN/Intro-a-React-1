/* Importación de componente Link */
import { Link } from 'react-router-dom';

/* Creación de función para mostrar el listado de citas existentes */
function Citas({ citas, eliminarCita }) {
  if (citas.length === 0) {
    return <p>📭 No hay citas registradas.</p>;
  }

  return (
    <div className="container">
      <h2>Lista de Citas</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id} style={{ marginBottom: '15px' }}>
            <strong>{cita.paciente}</strong> — {cita.fecha} a las {cita.hora}
            <div style={{ marginTop: '5px' }}>
              {/* Redirección a los detalles de una cita en particular */}
              <Link to={`/cita/${cita.id}`}>
                <button>🔍 Ver Detalles</button>
              </Link>
              {/* Botón para eliminar una cita */}
              <button onClick={() => eliminarCita(cita.id)} style={{ marginLeft: '10px' }}>
                🗑️ Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Citas;