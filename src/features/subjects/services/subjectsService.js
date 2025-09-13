// src/services/subjectService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // ajuste conforme sua API

export const getSubjects = async () => {
  const res = await axios.get(`${API_URL}/subjects`);
  return res.data;
};

export const createSubject = async (subject) => {
  const res = await axios.post(`${API_URL}/subjects`, subject);
  return res.data;
};

export const editSubject = async (subject) => {
  const res = await axios.put(`${API_URL}/subjects/${subject.id}`, subject);
  return res.data;
};

export const deleteSubject = async (id) => {
  await axios.delete(`${API_URL}/subjects/${id}`);
};
