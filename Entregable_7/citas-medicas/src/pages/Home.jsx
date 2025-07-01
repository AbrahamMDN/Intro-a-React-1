/* Creación de una función para diseñar la página de inicio */
function Home() {
  // Creación de función para borrar todas las citas de memoria local
  const resetData = () => {
    localStorage.removeItem('citas');
    window.location.reload();
  };

  return (
    <div className="container">
      <h1>Bienvenido al Sistema de Gestión de Citas Médicas</h1>
      <h2>Desde aquí puedes gestionar las citas de tus pacientes</h2>
      <p>Usa el menú para ver, agregar o eliminar citas. Consulta el calendario visual para una mejor experiencia</p>
      {/* Botón para aplicar función de vaciado de memoria local */}
      <button onClick={resetData}>🗑 Borrar todas las citas</button>
    </div>
  );
}

export default Home;