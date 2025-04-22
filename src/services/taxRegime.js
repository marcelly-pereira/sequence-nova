// Base URLs para as APIs
const API_BASE_URL = 'https://comercial.sequence.app.br';
const API_URL_REGIMES = `${API_BASE_URL}/api/v1/regime_tributario/`;
const API_URL_OBRIGACOES = `${API_BASE_URL}/api/v1/obrigacoes/`;
const API_URL_DEPARTAMENTOS = `${API_BASE_URL}/api/departamentos/`;

/**
 * Função para buscar todas as páginas de uma API paginada
 * @param {string} url - URL da API
 * @returns {Promise<Array>} - Array com todos os resultados
 */
export const fetchAllPages = async (url) => {
  let allResults = [];
  let nextUrl = url;
  let totalCount = 0;

  while (nextUrl) {
    try {
      const response = await fetch(nextUrl);

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.results) {
        allResults = [...allResults, ...data.results];
        nextUrl = data.next;
        
        // Armazenar a contagem total apenas na primeira página
        if (url === nextUrl || totalCount === 0) {
          totalCount = data.count || 0;
        }
      } else {
        nextUrl = null;
      }
    } catch (err) {
      console.error('Erro ao buscar página:', err);
      throw err;
    }
  }

  return { results: allResults, count: totalCount };
};

/**
 * Serviço para buscar todos os departamentos
 * @returns {Promise<Object>} - Mapa de departamentos indexado por ID
 */
export const fetchDepartamentos = async () => {
  try {
    const response = await fetch(API_URL_DEPARTAMENTOS);

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
};

/**
 * Serviço para buscar todas as obrigações
 * @returns {Promise<Object>} - Mapa de obrigações indexado por ID
 */
export const fetchObrigacoes = async () => {
  try {
    const { results: obrigacoesData } = await fetchAllPages(API_URL_OBRIGACOES);
    
    const map = {};
    obrigacoesData.forEach(obrigacao => {
      map[obrigacao.id] = {
        id: obrigacao.id,
        nome: obrigacao.nome,
        mininome: obrigacao.mininome || obrigacao.nome
      };
    });

    return map;
  } catch (error) {
    console.error('Erro ao buscar obrigações:', error);
    throw error;
  }
};

/**
 * Serviço para buscar todos os regimes tributários
 * @returns {Promise<Object>} - Objeto com resultados e contagem total
 */
export const fetchRegimesTributarios = async () => {
  try {
    return await fetchAllPages(API_URL_REGIMES);
  } catch (error) {
    console.error('Erro ao buscar regimes tributários:', error);
    throw error;
  }
};

/**
 * Serviço para excluir um regime tributário
 * @param {number} regimeId - ID do regime a ser excluído
 * @returns {Promise<Response>} - Objeto de resposta da requisição
 */
export const excluirRegimeTributario = async (regimeId) => {
  const response = await fetch(`${API_URL_REGIMES}${regimeId}/`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao excluir regime: ${response.status}`);
  }
  
  return response;
};

/**
 * Serviço para salvar um regime tributário (criar ou atualizar)
 * @param {Object} regimeData - Dados do regime
 * @returns {Promise<Response>} - Objeto de resposta da requisição
 */
export const salvarRegimeTributario = async (regimeData) => {
  const url = regimeData.id 
    ? `${API_URL_REGIMES}${regimeData.id}/` 
    : API_URL_REGIMES;

  const method = regimeData.id ? 'PUT' : 'POST';

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(regimeData),
  });

  if (!response.ok) {
    throw new Error(`Erro ao ${regimeData.id ? 'atualizar' : 'criar'} regime: ${response.status}`);
  }
  
  return response;
};

const taxRegimeServices = {
  fetchDepartamentos,
  fetchObrigacoes,
  fetchRegimesTributarios,
  excluirRegimeTributario,
  salvarRegimeTributario
};

export default taxRegimeServices;