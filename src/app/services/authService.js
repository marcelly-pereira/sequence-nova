import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://admin.sequence.app.br';
const TOKEN_KEYS = {
  ACCESS: 'accessToken',
  REFRESH: 'refreshToken',
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        localStorage.setItem(TOKEN_KEYS.ACCESS, access);
        
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

const setTokens = (tokens) => {
  localStorage.setItem(TOKEN_KEYS.ACCESS, tokens.access);
  localStorage.setItem(TOKEN_KEYS.REFRESH, tokens.refresh);
};

const login = async (email, password) => {
  try {
    const response = await api.post('/api/token/', { email, password });
    setTokens(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEYS.ACCESS);
  localStorage.removeItem(TOKEN_KEYS.REFRESH);
  window.location.href = '/login';
};

const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEYS.ACCESS);
};

const authService = {
  login,
  logout,
  isAuthenticated,
  api,
};

export default authService;