import authService from './authService';

const basicAuthUsername = 'comercial@admin.com';
const basicAuthPassword = '761349852Jp!';

const API_BASE_URL = 'https://comercial.sequence.app.br';

const collaboratorsService = {
  fetchColaboradores: async (page = 1, pageSize = 10) => {
    try {
      const url = new URL(`${API_BASE_URL}/empresas/api/colaboradores`);
      url.searchParams.append('page', page);
      url.searchParams.append('page_size', pageSize);
      
      const response = await authService.fetchWithBasicAuth(
        url.toString(),
        basicAuthUsername,
        basicAuthPassword
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Falha ao carregar os colaboradores: ${error.message}`);
    }
  },

  fetchDepartamentos: async () => {
    try {
      const response = await authService.fetchWithBasicAuth(
        `${API_BASE_URL}/api/departamentos/`,
        basicAuthUsername,
        basicAuthPassword
      );
      
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

  addColaborador: async (colaboradorData) => {
    try {
      const response = await authService.fetchWithBasicAuth(
        `${API_BASE_URL}/empresas/api/colaboradores`,
        basicAuthUsername,
        basicAuthPassword,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(colaboradorData),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erro ao adicionar colaborador: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Erro ao adicionar colaborador:", error);
      throw error;
    }
  },

  updateColaborador: async (id, colaboradorData) => {
    try {
      const response = await authService.fetchWithBasicAuth(
        `${API_BASE_URL}/empresas/api/colaboradores/${id}`,
        basicAuthUsername,
        basicAuthPassword,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(colaboradorData),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erro ao atualizar colaborador: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Erro ao atualizar colaborador:", error);
      throw error;
    }
  },

  deleteColaborador: async (id) => {
    try {
      const response = await authService.fetchWithBasicAuth(
        `${API_BASE_URL}/empresas/api/colaboradores/${id}`,
        basicAuthUsername,
        basicAuthPassword,
        {
          method: 'DELETE'
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erro ao deletar colaborador: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error("Erro ao deletar colaborador:", error);
      throw error;
    }
  }
};

export default collaboratorsService;