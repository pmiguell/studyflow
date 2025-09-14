import axios from "axios";
import { getToken } from "../../auth/services/tokenService";

const API_URL = "http://localhost:8080";

const getAxiosConfig = () => {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Listar matérias do usuário logado
export const getSubjects = async () => {
  const config = getAxiosConfig();
  const res = await axios.get(`${API_URL}/subjects`, config);
  return res.data;
};

// Criar nova matéria
export const createSubject = async (subject) => {
  const config = getAxiosConfig();
  const res = await axios.post(`${API_URL}/subjects`, subject, config);
  return res.data;
};

// Atualizar matéria existente
export const editSubject = async (subject) => {
  if (!subject.id) throw new Error("O ID da matéria é obrigatório");
  const config = getAxiosConfig();
  const res = await axios.put(`${API_URL}/subjects/${subject.id}`, subject, config);
  return res.data;
};

// Deletar matéria
export const deleteSubject = async (id) => {
  if (!id) throw new Error("O ID da matéria é obrigatório");
  const config = getAxiosConfig();
  await axios.delete(`${API_URL}/subjects/${id}`, config);
};
