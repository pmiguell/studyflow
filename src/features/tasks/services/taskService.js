import axios from "axios";
import { getToken } from "../../auth/services/tokenService";

const API_URL = "http://localhost:8080";

const getAxiosConfig = () => {
  const token = getToken();
  if (!token) throw new Error("Usuário não autenticado");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Listar tarefas
export const getTasks = async () => {
  const config = getAxiosConfig();
  const res = await axios.get(`${API_URL}/tasks`, config);
  return res.data;
};

// Criar tarefa vinculada a uma matéria
export const createTask = async (task) => {
  const config = getAxiosConfig();
  const res = await axios.post(
    `${API_URL}/tasks/subject/${task.subjectId}`,
    task,
    config
  );
  return res.data;
};

// Editar tarefa
export const editTask = async (task) => {
  const config = getAxiosConfig();
  const res = await axios.put(`${API_URL}/tasks/${task.id}`, task, config);
  return res.data;
};

// Deletar tarefa
export const deleteTask = async (id) => {
  const config = getAxiosConfig();
  await axios.delete(`${API_URL}/tasks/${id}`, config);
};
