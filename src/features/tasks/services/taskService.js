import axios from "axios"

const API_URL = 'https://seu-backend/api/tasks';

export const getTasks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar tarefas');
  return res.json();
}

export const editTask = async (task) => {
  const res = await fetch(`${API_URL}/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Erro ao atualizar tarefa');
  return res.json();
}

export const createTask = async (task) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Erro ao criar tarefa');
  return res.json();
}

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar tarefa');
  return true;
}


//Pensar em filtros e ordenação