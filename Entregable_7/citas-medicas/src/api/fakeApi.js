// Simulación de API para enviar citas genéricas por default cuando no hay inputs de citas: Se utiliza una función asincrónica
export const obtenerCitas = async () => {
  console.log('📡 Simulando fetch desde API');
  return [
    { id: '1', paciente: 'Aaron Ramsey', fecha: '2025-07-01', hora: '10:00' },
    { id: '2', paciente: 'Alejandra Aguirre', fecha: '2025-07-02', hora: '14:30' },
    { id: '3', paciente: 'Abraham Medina', fecha: '2025-07-03', hora: '09:00' },
  ];
};
