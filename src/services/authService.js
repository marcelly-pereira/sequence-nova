import axios from 'axios';
import cookieService from '../utils/cookies';

const API_URL = process.env.REACT_APP_API_URL || 'https://admin.sequence.app.br';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = cookieService.getAccessToken();
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
        const refreshToken = cookieService.getRefreshToken();
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }
        
        const response = await axios.post(`${API_URL}/api/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        cookieService.setTokens({ access, refresh: refreshToken });
        
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

const login = async (email, password) => {
  try {
    const response = await api.post('/api/token/', { email, password });
    cookieService.setTokens(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  cookieService.removeTokens();
  window.location.href = '/login';
};

const isAuthenticated = () => {
  return cookieService.hasAuthTokens();
};

const authService = {
  login,
  logout,
  isAuthenticated,
  api,
};

export default authService;