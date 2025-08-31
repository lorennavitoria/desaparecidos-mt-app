// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/api', // Base URL da API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPeople = async (params?: any) => {
  try {
    const response = await api.get('/pessoas', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error);
    throw error;
  }
};

export const getPersonDetails = async (id: string) => {
  try {
    const response = await api.get(`/pessoas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes da pessoa com ID ${id}:`, error);
    throw error;
  }
};

export const postInformation = async (id: string, data: any) => {
  try {
    const response = await api.post(`/pessoas/${id}/informacoes`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao enviar informações para a pessoa com ID ${id}:`, error);
    throw error;
  }
};
