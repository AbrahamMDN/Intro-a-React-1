/* Creación de función para mostrar mensaje de error en rutas inexistentes dentro del sitio*/
function NotFound() {
  return (
    <div className="container">
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que intentaste acceder no existe.</p>
    </div>
  );
}

export default NotFound;