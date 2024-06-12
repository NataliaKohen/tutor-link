import axios from 'axios';
import dayjs from 'dayjs';

const BASE_URL = 'http://localhost:8080/api';
// const BASE_URL = "http://44.193.72.252:8080/api";

// Obtener disponibilidad de un profesor
export const getAvailabilitiesById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/availabilities/teacher/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching availabilities:', error);
    throw error;
  }
};
//Reservar hora con un profesor
export const addReservation = async (userId, teacherId, start, end) => {
  let res = await axios.post(`${BASE_URL}/reservations`, {
    userId,
    teacherId,
    startTime: start.format('YYYY-MM-DDTHH:mm:ss'),
    endTime: end.format('YYYY-MM-DDTHH:mm:ss'),
    status: 'PENDING',
  });
  return res.data;
};

//Crear disponibilidad profesor
export const addSchedule = async (teacherId, date, startTime, endTime) => {
  let res = await axios.post(`${BASE_URL}/availabilities`, {
    teacherId,
    date,
    startTime,
    endTime
  });
  return res.data;
};
//Listar las reservaciones del usuario
export const getReservationsUser = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reservations/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations user:', error);
    throw error;
  }
};





