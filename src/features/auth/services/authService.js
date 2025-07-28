import axios from 'axios';

export const registerUser = async (userData) => {
    const response = await axios.post('http://localhost:8080/auth/register', userData);
    return response.data;
}

export const loginUser = async (credentials) => {
    const response = await axios.post('http://localhost:8080/auth/login', credentials);
    return response.data;
}

export const verifyUser = async (email, verificationCode) => {
    const response = await axios.post('http://localhost:8080/auth/verify', {email, verificationCode});
    return response.data;
}

//implementar logout