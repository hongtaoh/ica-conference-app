import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'

export const fetchPapers = async (page, limit = 50) => {
    const response = await axios.get(`${API_BASE_URL}/papers`, { params: { page, limit } });
    return response.data;
  };

export const fetchSinglePaper = async (PaperID) => {
    const response = await axios.get(`${API_BASE_URL}/papers/${PaperID}`)
    return response.data;
}

export const fetchSamplePapers = async (limit = 100) => {
    const response = await axios.get(`${API_BASE_URL}/sample_papers`, {
         params : {limit}
    });
    return response.data;
}

export const fetchAuthors = async (params) => {
    const response = await axios.get(`${API_BASE_URL}/authors`, { params })
    return response.data;
}

export const fetchSessions = async (params) => {
    const response = await axios.get(`${API_BASE_URL}/sessions`, { params })
    return response.data;
}