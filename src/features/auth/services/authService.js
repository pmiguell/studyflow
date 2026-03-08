import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';
const TOKEN_KEY = 'auth_token';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);

  // 🔹 Salva o token assim que fizer login
  if (response.data.token) {
    saveToken(response.data.token);
  }

  return response.data;
};

export const verifyUser = async (email, verificationCode) => {
  const response = await axios.post(`${API_URL}/verify`, {
    email,
    verificationCode,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (email, code, newPassword) => {
  const response = await axios.post(`${API_URL}/reset-password`, {
    email,
    code,
    newPassword,
  });
  return response.data;
};

// ===============================
// 🔹 Controle de token (auth)
// ===============================
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const logout = () => {
  removeToken();
  window.location.href = '/login';
};
