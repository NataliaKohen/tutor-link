import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { addRating } from '../../api/api'; 
import { Rate, Button, Input, message } from 'antd';
import './AddRating.css';

const { TextArea } = Input;

const AddRating = ({ teacherId, onRatingAdded }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const { userId } = useAuth();

  const handleSubmit = async () => {
    if (value === 0 || comment === '') {
      message.warning('Por favor, completa todos los campos.');
      return;
    }

    const rating = {
      rating: value, // Cambié value a rating
      comment,
      userId,
      teacherId
    };

    try {
      await addRating(rating);
      message.success('Calificación añadida con éxito!');
      setValue(0);
      setComment('');
      onRatingAdded();
    } catch (error) {
      message.error('Error al añadir la calificación.');
    }
  };

  return (
    <div className="add-rating">
      <h3>Añadir Calificación</h3>
      <Rate onChange={setValue} value={value} />
      <TextArea
        rows={4}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder="Escribe tu comentario"
      />
      <Button type="primary" onClick={handleSubmit}>
        Enviar
      </Button>
    </div>
  );
};

export default AddRating;