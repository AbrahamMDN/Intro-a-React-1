// Planeta.jsx
import React, { useEffect } from 'react';

function Planeta({ nombre }) {
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`); // Montaje: Registro de planeta

    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`); // Desmontaje: Limpieza del registro de planeta
    };
  }, [nombre]);

  return <div className="planeta">{nombre}</div>;
}

export default Planeta;