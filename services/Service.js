// src/services/api.js

import axios from 'axios';

// URL de base de l'API
const API_BASE_URL = 'http://localhost:3000';

// Fonction pour enregistrer un utilisateur
export const registerUser = async (name, phone) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, { name, phone });
        return response.data; // Retourner la réponse de l'API
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Erreur lors de l\'enregistrement');
    }
};

// Fonction pour poser une question anonyme
export const askQuestion = async (userId, question) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/ask/${userId}`, { question });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Erreur lors de la soumission de la question');
    }
};

// Fonction pour récupérer les questions d'un utilisateur
export const getQuestions = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions/${userId}`);
        return response.data.questions;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Erreur lors de la récupération des questions');
    }
};

// Nouvelle fonction pour récupérer un utilisateur par son téléphone
export const getUserByPhone = async (phone) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${phone}`);
        return response.data; // Retourner l'utilisateur trouvé
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Utilisateur non trouvé');
    }
};
