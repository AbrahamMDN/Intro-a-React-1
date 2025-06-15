// Importaciones de hooks, Componentes UI, Zod y Estilos
import React, { useState, useEffect} from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from '@mui/material';
import { z } from 'zod';
import './App.css';

// Esquema de validación con Zod
const planetaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  imagen: z
    .string()
    .url('Debe ser una URL válida')
    .regex(/\.(jpg|jpeg|png|gif)$/i, 'La URL debe terminar en .jpg, .png, etc.')
    .optional()
    .or(z.literal('')),
});

// App
function App() {
  // Estado inicial
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  // Efecto secundario: Almacenamiento de datos
  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Manejo de errores al agregar planetas, actualizar el estado y al limpiar formulario 
    try{
      const nuevoPlaneta = planetaSchema.parse({
        nombre,
        descripcion,
        imagen,
      });

      if(editIndex !== null){
        const actualizados = [...planetas];
        actualizados[editIndex] = nuevoPlaneta;
        setPlanetas(actualizados);
        setEditIndex(null);
      } else {
        setPlanetas([...planetas,nuevoPlaneta]);
      }
      
      setNombre('');
      setDescripcion('');
      setImagen('');
      setErrors({});
    } catch(error) {
      if (error instanceof z.ZodError) {
        const erroresZod = {};
        error.errors.forEach((err) => {
          erroresZod[err.path[0]] = err.message;
        });
        setErrors(erroresZod);
      } else {
        console.error('Error inesperado:', error);
        alert('Ocurrió un error inesperado al guardar el planeta.');
      }
    }
  };    

  // Función para borrar planetas
  const handleDelete = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
    if (editIndex === index){
      setEditIndex(null);
      setNombre('');
      setDescripcion('');
      setImagen('');
      setErrors({});
    }
  };

  // Función para editar información de los planetas agregados 
  const handleEdit = (index) => {
    const planeta = planetas[index];
    setNombre(planeta.nombre);
    setDescripcion(planeta.descripcion);
    setImagen(planeta.imagen || '');
    setEditIndex(index);
    setErrors({});
  };

  return (
    <Container className="body-space" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom className="title">
        Bitácora de Exploración
      </Typography>

      <form onSubmit={handleSubmit} className="form-bitacora" style={{ marginBottom: '2rem' }}>
        <TextField
          fullWidth
          label="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
          error={!!errors.nombre}
          helperText={errors.nombre}
        />
        <TextField
          fullWidth
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          error={!!errors.descripcion}
          helperText={errors.descripcion}
        />
        <TextField
          fullWidth
          label="URL de la imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          margin="normal"
          error={!!errors.imagen}
          helperText={errors.imagen}
        />
        <Button 
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#00bcd4',
            '&:hover': {
              backgroundColor: '#008c9e',
            },
            fontWeight: 'bold',
            marginTop: '1rem',
          }}
        >
          {editIndex !== null ? 'Guardar cambios' : 'Guardar'}
        </Button >
      </form>

      <Typography variant="h5" gutterBottom className="title">
        Planetas Registrados
      </Typography>

      <Grid container spacing={2}>
        {planetas.map((planeta, index) => (
          <Grid key={index}>
            <Card className="card-bitacora" 
              sx={{
                background: 'rgba(10, 25, 47, 0.85)',
                color: 'white',
                borderRadius: 3,
                border: '1px solid rgba(0, 255, 255, 0.2)',
                boxShadow: '0 0 12px rgba(0, 255, 255, 0.1)',
                fontFamily: '"Courier New", monospace',
              }}>
              {planeta.imagen && (
                <CardMedia
                  component="img"
                  height="140"
                  image={planeta.imagen}
                  alt={planeta.nombre}
                />
              )}
              <CardContent className="card-content">
                <Typography variant="h6">{planeta.nombre}</Typography>
                <Typography variant="body2">{planeta.descripcion}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(index)}
                  style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                  sx={{ mt: 1, mr: 1, borderColor: '#00bcd4', color: '#00bcd4' }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(index)}
                  style={{ marginTop: '0.5rem' }}
                >
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
