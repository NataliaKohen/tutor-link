import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { storage } from './firebaseConfig';
import { Button, TextField, Select, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [mostrar, setMostrar] = useState(true);
  const subjectOptions = [
    { value: '', label: 'Seleccionar tema' },
    { value: 'historia', label: 'Historia' },
    { value: 'matematicas', label: 'Matemáticas' },
    { value: 'inglés', label: 'Inglés' },
    { value: 'lenguaje', label: 'Lenguaje' },
  ];

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      name: '',
      dni: '',
      description: '',
      subject: '',
    },
    onSubmit: async (data) => {
      try {


        // // Subir cada imagen al almacenamiento de Firebase y obtener las URLs
        // const imageUrls = await Promise.all(
        //   data.images.map(async (image) => {
        //     const storageRef = storage.ref(`images/${image.name}`);
        //     await storageRef.put(image);
        //     return await storageRef.getDownloadURL();
        //   })
        // );

        // // Agregar las URLs de las imágenes al objeto de datos
        // data.images = imageUrls;


        // Enviar los datos al servidor sin manejo de imágenes
        const response = await axios.post(
          'http://localhost:8080/api/teachers',
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

       
        setMostrar(false);
        console.log('Respuesta del servidor:', response.data);
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El profesor se ha registrado correctamente.',
        });
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'El nombre debe tener por lo menos 3 caracteres')
        .max(20, 'El nombre debe tener máximo 20 caracteres')
        .required('El campo es obligatorio'),
      dni: Yup.string()
        .min(8, 'El DNI debe tener por lo menos 8 caracteres')
        .max(11, 'El DNI debe tener máximo 11 caracteres')
        .required('El campo es requerido'),
      description: Yup.string(),
      subject: Yup.string().required('Seleccione un tema'),
    }),
    validateOnChange: false,
  });

  return (
    <main>
      {mostrar && (
        <form className="container-form" onSubmit={handleSubmit}>
          <h2>Formulario de Registro</h2>
          <TextField
            type="text"
            onChange={handleChange}
            name="name"
            label="Ingrese su nombre"
            variant="outlined"
            error={errors.name ? true : false}
            helperText={errors.name}
          />
          <TextField
            type="text"
            onChange={handleChange}
            name="dni"
            label="Ingrese el DNI del profesor"
            variant="outlined"
            autoComplete="off"
            error={errors.dni ? true : false}
            helperText={errors.dni}
          />
          <TextField
            type="text"
            onChange={handleChange}
            name="description"
            label="Ingrese su área de conocimiento"
            multiline
            rows={4}
            variant="outlined"
            autoComplete="off"
            error={errors.description ? true : false}
            helperText={errors.description}
          />
          <Select
            value={values.subject}
            onChange={handleChange}
            name="subject"
            label="Subject"
            variant="outlined"
            displayEmpty // Esta propiedad permite mostrar el label cuando no hay una opción seleccionada
  inputProps={{ 'aria-label': 'Subject' }} 
            fullWidth
          >
            {subjectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
       
          {/* <input
            type="file"
            name="images"
            onChange={(event) =>
              setFieldValue('images', Array.from(event.currentTarget.files))
            }
            multiple
          /> */}

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      ) }
    </main>
  );
};

export default Form;
