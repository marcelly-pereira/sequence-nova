import authService from './authService';

const basicAuthUsername = 'comercial@admin.com';
const basicAuthPassword = '761349852Jp!';

const API_BASE_URL = 'https://comercial.sequence.app.br';

const obligationsService = {
  fetchObrigacoes: async (page = 1, pageSize = 10) => {
    try {
      const url = new URL(`${API_BASE_URL}/api/v1/obrigacoes/`);
      url.searchParams.append('page', page);
      url.searchParams.append('page_size', pageSize);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Falha ao carregar as obrigações: ${error.message}`);
    }
  },

  /**
 * @returns {Promise<Object>} - Mapa de departamentos indexado por ID
 */
fetchDepartamentos: async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/departamentos/`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar departamentos: ${response.status}`);
    }
    
    const data = await response.json();
    const departamentosData = data.results || data;
    const departamentosArray = Array.isArray(departamentosData) ? departamentosData : [];
    
    const depMap = {};
    departamentosArray.forEach(dep => {
      depMap[dep.id] = {
        id: dep.id,
        nome: dep.nome
      };
    });
    
    return depMap;
  } catch (error) {
    console.error('Erro ao buscar departamentos:', error);
    return {};
  }
},

  fetchResponsaveis: async () => {
    try {
      const response = await authService.fetchWithBasicAuth(
        `${API_BASE_URL}/empresas/api/colaboradores`,
        basicAuthUsername,
        basicAuthPassword
      );
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar responsáveis: ${response.status}`);
      }
      const data = await response.json();
      const respMap = {};
      if (Array.isArray(data)) {
        data.forEach(resp => {
          respMap[resp.id] = resp.nome;
        });
      }
      return respMap;
    } catch (error) {
      console.error("Erro ao buscar responsáveis:", error);
      throw error;
    }
  }
};

export default obligationsService;