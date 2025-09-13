import axios from "axios";

const API_URL = "http://localhost:8080/api"; // ajuste para sua URL real

export const getTasks = async (subjectId) => {
  const res = await axios.get(`${API_URL}/subjects/${subjectId}/tasks`);
  return res.data;
};

export const createTask = async (subjectId, task) => {
  const res = await axios.post(`${API_URL}/subjects/${subjectId}/tasks`, task);
  return res.data;
};

export const editTask = async (subjectId, task) => {
  const res = await axios.put(`${API_URL}/subjects/${subjectId}/tasks/${task.id}`, task);
  return res.data;
};

export const deleteTask = async (subjectId, id) => {
  await axios.delete(`${API_URL}/subjects/${subjectId}/tasks/${id}`);
};
