import cookieService from '../utils/cookies';

const API_URL = process.env.REACT_APP_API_URL || 'https://admin.sequence.app.br';

// Lista de endpoints que usam Basic Auth
const BASIC_AUTH_ENDPOINTS = [
  'https://comercial.sequence.app.br/api/listaempresas/',
  'https://comercial.sequence.app.br/empresas/api/colaboradores/'
];

const setupFetchInterceptors = () => {
  const originalFetch = window.fetch;
  
  window.fetch = async function(...args) {
    if (args[0] && typeof args[0] === 'string') {
      const url = args[0];
      
      // Verificar se a URL é um endpoint de Basic Auth
      const isBasicAuthEndpoint = BASIC_AUTH_ENDPOINTS.some(endpoint => 
        url.includes(endpoint)
      );
      
      // Verifica se é um endpoint da API que não usa Basic Auth
      const isApiEndpoint = (url.includes('sequence.app.br') || url.startsWith('/api/'));
      
      // Se for um endpoint da API que não usa Basic Auth e não for refresh token
      if (isApiEndpoint && !isBasicAuthEndpoint && !url.includes('/api/token/refresh/')) {
        const token = cookieService.getAccessToken();
        
        if (token) {
          if (!args[1]) args[1] = {};
          if (!args[1].headers) args[1].headers = {};
          
          // Não sobrescreve Authorization se já existir
          if (!args[1].headers['Authorization']) {
            args[1].headers['Authorization'] = `Bearer ${token}`;
          }
        }
      }
    }
    
    try {
      const response = await originalFetch.apply(this, args);
      
      if (response.status === 401) {
        // Verificar se a URL é um endpoint de Basic Auth
        const isBasicAuthEndpoint = args[0] && typeof args[0] === 'string' && 
          BASIC_AUTH_ENDPOINTS.some(endpoint => args[0].includes(endpoint));
        
        // Não tentar refresh token se for um endpoint de Basic Auth
        if (isBasicAuthEndpoint) {
          throw new Error('Basic Auth authentication failed');
        }
        
        const refreshToken = cookieService.getRefreshToken();
        
        if (!refreshToken) {
          logout();
          throw new Error('Authentication failed');
        }
        
        const refreshResponse = await originalFetch(`${API_URL}/api/token/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken })
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          
          if (data.access) {
            cookieService.setTokens({
              access: data.access,
              refresh: refreshToken
            });
            
            if (!args[1]) args[1] = {};
            if (!args[1].headers) args[1].headers = {};
            args[1].headers['Authorization'] = `Bearer ${data.access}`;
            
            return originalFetch.apply(this, args);
          }
        }
        
        logout();
        throw new Error('Failed to refresh token');
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };
};

setupFetchInterceptors();

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    cookieService.setTokens(data);
    
    return data;
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

// Função para fazer chamadas com Basic Auth
const fetchWithBasicAuth = async (url, username, password, options = {}) => {
  const credentials = btoa(`${username}:${password}`);
  
  const requestOptions = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Basic ${credentials}`
    }
  };
  
  return fetch(url, requestOptions);
};

const authService = {
  login,
  logout,
  isAuthenticated,
  fetch: window.fetch,
  fetchWithBasicAuth
};

export default authService;