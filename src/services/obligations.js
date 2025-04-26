// const API_BASE_URL = 'https://comercial.sequence.app.br/api/v1';

// // Função para lidar com respostas da API e tratar erros
// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const errorText = await response.text();
//     let errorMessage;
//     try {
//       const errorData = JSON.parse(errorText);
//       errorMessage = errorData.detail || `Erro ${response.status}: ${response.statusText}`;
//     } catch (e) {
//       errorMessage = `Erro ${response.status}: ${response.statusText}`;
//     }
//     throw new Error(errorMessage);
//   }
  
//   try {
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Erro ao processar dados do servidor');
//   }
// };

// // Função para construir URL com parâmetros de consulta
// const buildUrl = (endpoint, params = {}) => {
//   let url = `${API_BASE_URL}${endpoint}`;
  
//   // Adiciona parâmetros de query se houver
//   if (Object.keys(params).length > 0) {
//     const queryParams = new URLSearchParams();
    
//     Object.keys(params).forEach(key => {
//       if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
//         queryParams.append(key, params[key]);
//       }
//     });
    
//     const queryString = queryParams.toString();
//     if (queryString) {
//       url += (url.includes('?') ? '&' : '?') + queryString;
//     }
//   }
  
//   return url;
// };

// export const ObrigacaoService = {
//   // Buscar todas as obrigações com paginação
//   fetchObrigacoes: async (page = 1, filters = {}) => {
//     const url = buildUrl('/obrigacoes/', { ...filters, page });
//     const response = await fetch(url);
//     return await handleResponse(response);
//   },
  
//   // Buscar departamentos (usando o endpoint que você mencionou)
//   fetchDepartamentos: async () => {
//     const url = 'https://comercial.sequence.app.br/api/departamentos/';
//     const response = await fetch(url);
//     return await handleResponse(response);
//   },
  
//   // Buscar informações do responsável por ID
//   fetchResponsavelPorId: async (id) => {
//     const url = buildUrl(`/lista_de_obrigacoes_do_responsavel/`, { responsavel_id: id });
//     const response = await fetch(url);
//     const data = await handleResponse(response);
    
//     // Extrair informações do responsável
//     // Se a API retornar o nome do responsável dentro dos dados
//     if (data && data.responsavel_nome) {
//       return { id, nome: data.responsavel_nome };
//     }
    
//     // Se a API retornar uma lista de obrigações, tentar extrair o nome do responsável da primeira
//     if (data && Array.isArray(data.results) && data.results.length > 0 && data.results[0].responsavel_nome) {
//       return { id, nome: data.results[0].responsavel_nome };
//     }
    
//     // Fallback: não conseguiu encontrar o nome
//     return { id, nome: `Responsável ${id}` };
//   },
  
//   // Buscar uma obrigação específica por ID
//   fetchObrigacaoPorId: async (id) => {
//     const response = await fetch(`${API_BASE_URL}/obrigacoes/${id}/`);
//     return await handleResponse(response);
//   },
  
//   // Criar uma nova obrigação
//   criarObrigacao: async (obrigacaoData) => {
//     const response = await fetch(`${API_BASE_URL}/obrigacoes/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(obrigacaoData),
//     });
//     return await handleResponse(response);
//   },
  
//   // Atualizar uma obrigação existente
//   atualizarObrigacao: async (id, obrigacaoData) => {
//     const response = await fetch(`${API_BASE_URL}/obrigacoes/${id}/`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(obrigacaoData),
//     });
//     return await handleResponse(response);
//   },
  
//   // Excluir uma obrigação
//   excluirObrigacao: async (id) => {
//     const response = await fetch(`${API_BASE_URL}/obrigacoes/${id}/`, {
//       method: 'DELETE',
//     });
    
//     if (!response.ok) {
//       return await handleResponse(response);
//     }
    
//     return true;
//   }
// };

// export default ObrigacaoService;