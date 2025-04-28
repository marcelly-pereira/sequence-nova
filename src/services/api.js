import cookieService from '../utils/cookies';

const API_URL = process.env.REACT_APP_API_URL || 'https://admin.sequence.app.br';

const getAuthHeaders = () => {
  const token = cookieService.getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      const refreshed = await refreshTokenAndRetry();
      if (refreshed) {
        return refreshed;
      }
    }
    
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.detail || `Erro ${response.status}: ${response.statusText}`
    );
    error.status = response.status;
    error.response = errorData;
    throw error;
  }
  
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

const refreshTokenAndRetry = async (originalRequest) => {
  try {
    const refreshToken = cookieService.getRefreshToken();
    if (!refreshToken) {
      logout();
      return null;
    }
    
    const refreshResponse = await fetch(`${API_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!refreshResponse.ok) {
      throw new Error('Falha ao renovar token');
    }
    
    const tokenData = await refreshResponse.json();
    cookieService.setTokens({
      access: tokenData.access,
      refresh: refreshToken, 
    });
    
    if (originalRequest) {
      return fetch(originalRequest.url, {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          'Authorization': `Bearer ${tokenData.access}`,
        },
      }).then(handleResponse);
    }
    
    return true; 
  } catch (error) {
    logout();
    return null;
  }
};

const logout = () => {
  cookieService.removeTokens();
  window.location.href = '/login';
};

const get = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;
  const requestOptions = {
    method: 'GET',
    headers: getAuthHeaders(),
  };
  
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, { url, ...requestOptions });
  } catch (error) {
    throw error;
  }
};

const post = async (endpoint, data) => {
  const url = `${API_URL}${endpoint}`;
  const requestOptions = {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  };
  
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, { url, ...requestOptions });
  } catch (error) {
    throw error;
  }
};

const put = async (endpoint, data) => {
  const url = `${API_URL}${endpoint}`;
  const requestOptions = {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  };
  
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, { url, ...requestOptions });
  } catch (error) {
    throw error;
  }
};

const del = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;
  const requestOptions = {
    method: 'DELETE',
    headers: getAuthHeaders(),
  };
  
  try {
    const response = await fetch(url, requestOptions);
    return handleResponse(response, { url, ...requestOptions });
  } catch (error) {
    throw error;
  }
};

// Função para fazer login
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(
        errorData.detail || `Erro ${response.status}: ${response.statusText}`
      );
      error.status = response.status;
      error.response = errorData;
      throw error;
    }
    
    const data = await response.json();
    cookieService.setTokens(data);
    return data;
  } catch (error) {
    throw error;
  }
};

const isAuthenticated = () => {
  return cookieService.hasAuthTokens();
};

const apiService = {
  get,
  post,
  put,
  delete: del,
  login,
  logout,
  isAuthenticated,
};

export default apiService;