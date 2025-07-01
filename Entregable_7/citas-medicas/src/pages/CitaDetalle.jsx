/* Importación de useParams y componente Link */
import { useParams, Link } from 'react-router-dom';

/* Creación de la función que despliega del detalles de una cita en particular */
function CitaDetalle({ citas }) {
  // Creación de ruta dinámica para useParams
  const { id } = useParams();
  // Función para la búsqueda de una cita por ID
  const cita = citas.find((c) => c.id === id);

  if (!cita) {
    return <p>❌ Cita no encontrada</p>;
  }

  return (
    <div className="container">
      <h2>Detalles de la Cita</h2>
      <p><strong>ID:</strong> {cita.id}</p>
      <p><strong>Paciente:</strong> {cita.paciente}</p>
      <p><strong>Fecha:</strong> {cita.fecha}</p>
      <p><strong>Hora:</strong> {cita.hora}</p>

      {/* Redirección a edición de cita */}
      <Link to={`/editar/${cita.id}`}>
        <button>✏️ Editar</button>
      </Link>
    </div>
  );
}

export default CitaDetalle;