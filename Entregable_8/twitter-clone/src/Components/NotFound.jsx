/* Creación de función para mostrar mensaje de error en rutas inexistentes dentro del sitio*/
function NotFound() {
  return (
    <div className="container">
      <h1>404 - Página no encontrada</h1>
      <h3>La ruta que intentaste acceder no existe.</h3>
    </div>
  );
}

export default NotFound;