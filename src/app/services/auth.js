import axios from 'axios';

const API_URL = '/api';

class AuthService {
  // Função para login
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/token/`, {
        email,
        password
      });
      
      if (response.data.access) {
        // Salva tokens no localStorage
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        // Configura o token para todas as requisições futuras
        this.setAuthHeader(response.data.access);
        
        // Decodifica e salva informações do usuário
        const userData = this.decodeToken(response.data.access);
        localStorage.setItem('user', JSON.stringify(userData));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Função para logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    axios.defaults.headers.common['Authorization'] = '';
  }

  // Obter token atual
  getCurrentToken() {
    return localStorage.getItem('access_token');
  }

  // Obter dados do usuário atual
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  // Verificar se o usuário está autenticado
  isAuthenticated() {
    const token = this.getCurrentToken();
    if (!token) return false;

    // Verifica se o token expirou
    const userData = this.decodeToken(token);
    if (!userData) return false;

    const currentTime = Date.now() / 1000;
    return userData.exp > currentTime;
  }

  // Atualizar token usando refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) throw new Error('Refresh token não encontrado');

      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: refreshToken
      });

      localStorage.setItem('access_token', response.data.access);
      this.setAuthHeader(response.data.access);
      
      return response.data;
    } catch (error) {
      // Se ocorrer erro, desloga o usuário
      this.logout();
      throw error;
    }
  }

  // Adicionar token no cabeçalho de todas as requisições
  setAuthHeader(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Decodificar o token JWT para obter as informações do usuário
  decodeToken(token) {
    try {
      // O JWT está dividido em três partes: header, payload e signature
      // O payload (parte do meio) contém as informações do usuário
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  // Configurar interceptor para renovar token automaticamente
  setupAxiosInterceptors() {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Se o erro for 401 (Não autorizado) e ainda não tentamos renovar o token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Tenta renovar o token
            await this.refreshToken();
            
            // Atualiza o token na requisição original
            originalRequest.headers.Authorization = `Bearer ${this.getCurrentToken()}`;
            
            // Refaz a requisição original com o novo token
            return axios(originalRequest);
          } catch (refreshError) {
            // Se não conseguir renovar, redirecionar para a página de login
            this.logout();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }
}

const authService = new AuthService();
export default authService;