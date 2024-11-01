import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

// Helper function for GET requests
const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error; // Optional: rethrow to handle in calling component
  }
};

// Specific API calls
// services/API.js
export const fetchPapers = async (params = {}) => {
  const defaultParams = { page: 1, limit: 50 };
  return getRequest('/papers', { ...defaultParams, ...params });
};

export const fetchSinglePaper = async (paper_id) => getRequest(`/papers/${paper_id}`);

export const fetchSamplePapers = async (limit = 100) => getRequest('/sample_papers', { limit });

export const fetchAuthors = async (page, limit = 50) => getRequest('/authors', { page, limit });

export const fetchSampleAuthors = async (limit = 100) => getRequest('/sample_authors', { limit });

export const fetchSessions = async (page, limit = 50) => getRequest('/sessions', { page, limit });

export const fetchSampleSessions = async (limit = 100) => getRequest('/sample_sessions', { limit });
