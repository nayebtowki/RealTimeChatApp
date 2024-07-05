import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Register a new user
export const register = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login a user
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Get messages for a chat room
export const getMessages = async (chatRoom) => {
    try {
        const response = await axios.get(`${API_URL}/messages`, { params: { chatRoom } });
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};
