import axios from 'axios';

let API_BASE_URL = 'http://127.0.0.1:8000'; // Local API as default

// Test if local API is reachable
const testLocalAPI = async () => {
  try {
    // Attempt to reach a known endpoint
    await axios.get(`${API_BASE_URL}/sample_papers`);
    console.log("Using local API.");
  } catch (error) {
    console.log("Local API not reachable. Falling back to production API.");
    // If the local API is unreachable, fallback to production API
    API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://ica-conf.onrender.com";
  }
};

// Run the test immediately to set the correct API base URL
testLocalAPI();

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000' 

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

export const fetchPapersViaSessionID = async (session_id, page = 1, limit = 50) => {
  const params = { page, limit, "session_info.session_id": session_id };
  return getRequest('/papers', params);
};

export const fetchSinglePaper = async (paper_id) => getRequest(`/papers/${paper_id}`);

export const fetchSamplePapers = async (limit = 100) => getRequest('/sample_papers', { limit });

export const fetchAuthors = async (page, limit = 50) => getRequest('/authors', { page, limit });

export const fetchSampleAuthors = async (limit = 100) => getRequest('/sample_authors', { limit });

export const fetchSessions = async (page, limit = 50) => getRequest('/sessions', { page, limit });

export const fetchSampleSessions = async (limit = 100) => getRequest('/sample_sessions', { limit });
