const API_URL = 'https://comercial.sequence.app.br/api/v1';

class ObrigacaoService {
  /**
   * Método interno para registrar ações de rastreamento
   * @param {string} acao - Tipo de ação (criar, editar, excluir)
   * @param {Object} dados - Dados da obrigação
   * @returns {Promise} - Promise com o resultado do rastreamento
   */
  static async _registrarAcao(acao, dados) {
    try {
      const response = await fetch(`${API_URL}/rastreamento/obrigacoes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          acao: acao,
          dados: dados,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        console.warn(`Aviso: Falha ao registrar ${acao} de obrigação`, response.statusText);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro ao registrar ${acao} de obrigação:`, error);
      // Não lança erro para não bloquear a ação principal
      return null;
    }
  }

  /**
   * Busca obrigações com paginação
   * @param {number} page - Número da página a ser carregada (padrão: 1)
   * @param {number} pageSize - Quantidade de itens por página (opcional)
   * @returns {Promise} - Promise com os dados das obrigações
   */
  static async fetchObrigacoes(page = 1, pageSize = 10) {
    try {
      const url = new URL(`${API_URL}/obrigacoes/`);
      url.searchParams.append('page', page);
      
      if (pageSize) {
        url.searchParams.append('page_size', pageSize);
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar obrigações:', error);
      throw error;
    }
  }

  /**
   * Cadastra uma nova obrigação
   * @param {Object} data - Dados da obrigação a ser cadastrada
   * @returns {Promise} - Promise com os dados da obrigação cadastrada
   */
  static async cadastrarObrigacao(data) {
    try {
      const response = await fetch(`${API_URL}/obrigacoes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      const obrigacaoCadastrada = await response.json();
      
      // Registra a ação de criação
      this._registrarAcao('criar', obrigacaoCadastrada);
      
      return obrigacaoCadastrada;
    } catch (error) {
      console.error('Erro ao cadastrar obrigação:', error);
      throw error;
    }
  }

  /**
   * Atualiza uma obrigação existente
   * @param {number} id - ID da obrigação a ser atualizada
   * @param {Object} data - Dados atualizados da obrigação
   * @returns {Promise} - Promise com os dados da obrigação atualizada
   */
  static async atualizarObrigacao(id, data) {
    try {
      const response = await fetch(`${API_URL}/obrigacoes/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      const obrigacaoAtualizada = await response.json();
      
      // Registra a ação de edição
      this._registrarAcao('editar', obrigacaoAtualizada);
      
      return obrigacaoAtualizada;
    } catch (error) {
      console.error(`Erro ao atualizar obrigação ${id}:`, error);
      throw error;
    }
  }

  /**
   * Exclui uma obrigação pelo ID
   * @param {number} id - ID da obrigação a ser excluída
   * @returns {Promise} - Promise com resposta da operação
   */
  static async excluirObrigacao(id) {
    try {
      // Primeiro, obtemos os dados da obrigação antes de excluir
      const obrigacaoAntes = await this.obterObrigacao(id);
      
      const response = await fetch(`${API_URL}/obrigacoes/${id}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      // Registra a ação de exclusão
      this._registrarAcao('excluir', obrigacaoAntes);
      
      if (response.status === 204) {
        return { success: true };
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro ao excluir obrigação ${id}:`, error);
      throw error;
    }
  }

  /**
   * Obtém uma obrigação específica pelo ID
   * @param {number} id - ID da obrigação a ser obtida
   * @returns {Promise} - Promise com os dados da obrigação
   */
  static async obterObrigacao(id) {
    try {
      const response = await fetch(`${API_URL}/obrigacoes/${id}/`);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Erro ao obter obrigação ${id}:`, error);
      throw error;
    }
  }
  
  /**
   * Busca obrigações com filtros
   * @param {Object} filtros - Objeto com os filtros a serem aplicados
   * @param {number} page - Número da página a ser carregada
   * @returns {Promise} - Promise com os dados das obrigações filtradas
   */
  static async filtrarObrigacoes(filtros = {}, page = 1) {
    try {
      const url = new URL(`${API_URL}/obrigacoes/`);
      
      url.searchParams.append('page', page);
      
      Object.entries(filtros).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          url.searchParams.append(key, value);
        }
      });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao filtrar obrigações:', error);
      throw error;
    }
  }
}

export default ObrigacaoService;