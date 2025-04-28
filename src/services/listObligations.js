import axios from 'axios';

const BASE_URL = 'https://comercial.sequence.app.br/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

const listObligationsService = {
  /**
   * Busca a lista de obrigações do responsável com paginação e filtragem
   * @param {Object} params - Parâmetros da requisição
   * @param {number} params.page - Número da página atual
   * @param {number} params.pageSize - Quantidade de itens por página
   * @param {string} params.search - Termo de busca (opcional)
   * @param {string} params.status - Status para filtrar (opcional)
   * @param {string} params.departamentoId - ID do departamento (opcional)
   * @param {string} params.empresaId - ID da empresa (opcional)
   * @returns {Promise} - Promessa com os resultados
   */
  getObrigacoes: async (params = {}) => {
    try {
      const {
        page = 1,
        pageSize = 10,
        search = '',
        status = '',
        departamentoId = '',
        empresaId = '',
        competenciaInicio = '',
        competenciaFim = '',
        prazoLegalInicio = '',
        prazoLegalFim = ''
      } = params;

      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      queryParams.append('page_size', pageSize);

      if (search) queryParams.append('search', search);
      if (status) queryParams.append('status', status);
      if (departamentoId) queryParams.append('departamento_id', departamentoId);
      if (empresaId) queryParams.append('empresa_id', empresaId);
      if (competenciaInicio) queryParams.append('competencia_gte', competenciaInicio);
      if (competenciaFim) queryParams.append('competencia_lte', competenciaFim);
      if (prazoLegalInicio) queryParams.append('prazo_legal_gte', prazoLegalInicio);
      if (prazoLegalFim) queryParams.append('prazo_legal_lte', prazoLegalFim);

      const response = await api.get(`/lista_de_obrigacoes_do_responsavel/?${queryParams.toString()}`);

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar obrigações:', error);

      return {
        status: 'error',
        message: error.response?.data?.message || error.message || 'Erro ao buscar dados',
        error
      };
    }
  },

  /**
   * Obtém detalhes de uma obrigação específica
   * @param {number} id - ID da obrigação
   * @returns {Promise} - Promessa com os resultados
   */
  getObrigacaoById: async (id) => {
    try {
      const response = await api.get(`/lista_de_obrigacoes_do_responsavel/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar obrigação #${id}:`, error);
      return {
        status: 'error',
        message: error.response?.data?.message || error.message || 'Erro ao buscar detalhes da obrigação',
        error
      };
    }
  },

  /**
   * Atualiza o status de uma obrigação
   * @param {number} id - ID da obrigação
   * @param {string} status - Novo status
   * @returns {Promise} - Promessa com o resultado da atualização
   */
  updateStatus: async (id, status) => {
    try {
      const response = await api.patch(`/lista_de_obrigacoes_do_responsavel/${id}/`, {
        status
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar status da obrigação #${id}:`, error);
      return {
        status: 'error',
        message: error.response?.data?.message || error.message || 'Erro ao atualizar status',
        error
      };
    }
  }
};

export default listObligationsService;