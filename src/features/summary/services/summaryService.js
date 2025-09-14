import axios from "axios";
import { getToken } from "../../auth/services/tokenService";

const API_URL = "http://localhost:8080";

const getAxiosConfig = () => {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");
  return { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } };
};

// Listar resumos
export const getSummaries = async () => {
  const config = getAxiosConfig();
  const res = await axios.get(`${API_URL}/summaries`, config);
  return res.data;
};

// Criar resumo vinculado a uma matéria
export const createSummary = async (subjectId, summary) => {
  const config = getAxiosConfig();
  const res = await axios.post(`${API_URL}/summaries/subject/${subjectId}`, summary, config);
  return res.data;
};

// Editar resumo
export const editSummary = async (summary) => {
  const config = getAxiosConfig();
  const res = await axios.put(`${API_URL}/summaries/${summary.id}`, summary, config);
  return res.data;
};

// Deletar resumo
export const deleteSummary = async (id) => {
  const config = getAxiosConfig();
  await axios.delete(`${API_URL}/summaries/${id}`, config);
};
