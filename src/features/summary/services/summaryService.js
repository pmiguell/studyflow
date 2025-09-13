// src/services/summaryService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api"; // ajuste se seu backend rodar em outro host/porta

export const getSummaries = async (subjectId) => {
  const res = await axios.get(`${API_URL}/subjects/${subjectId}/summaries`);
  return res.data;
};

export const createSummary = async (subjectId, summary) => {
  const res = await axios.post(`${API_URL}/subjects/${subjectId}/summaries`, summary);
  return res.data;
};

export const editSummary = async (subjectId, summary) => {
  const res = await axios.put(`${API_URL}/subjects/${subjectId}/summaries/${summary.id}`, summary);
  return res.data;
};

export const deleteSummary = async (subjectId, id) => {
  await axios.delete(`${API_URL}/subjects/${subjectId}/summaries/${id}`);
};
