import authService from './authService';

const basicAuthUsername = 'comercial@admin.com';
const basicAuthPassword = '761349852Jp!';

const companiesService = {
  async listarEmpresas() {
    try {
      const response = await authService.fetchWithBasicAuth(
        'https://comercial.sequence.app.br/api/listaempresas/',
        basicAuthUsername,
        basicAuthPassword
      );
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        return data.results.map(emp => ({
          id: emp.id,
          cnpj: emp.cnpj_cpf_caepf,
          regimeTributario: emp.regime_tributario_nome,
          nomeFantasia: emp.nome_fantasia,
          cidade: emp.cidade || '—',
          uf: emp.uf || '—',
          status: emp.ativa ? 'ativo' : 'inativo',
          prontuario: true
        }));
      } else {
        throw new Error('Formato de resposta inválido');
      }
    } catch (err) {
      throw new Error(`Falha ao carregar as empresas: ${err.message}`);
    }
  },
  
  async cadastrarEmpresa(empresaData) {
    // Implementar a lógica de cadastro de empresa quando necessário
    // Exemplo:
    /*
    try {
      const response = await authService.fetchWithBasicAuth(
        'https://comercial.sequence.app.br/api/empresas/',
        basicAuthUsername,
        basicAuthPassword,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(empresaData),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Erro ao cadastrar empresa: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      throw new Error(`Falha ao cadastrar empresa: ${err.message}`);
    }
    */
    
    // Por enquanto, retornamos um mock
    return {
      id: Date.now(),
      cnpj: empresaData.cnpj,
      regimeTributario: empresaData.regimeTributario,
      nomeFantasia: empresaData.nomeFantasia,
      cidade: empresaData.cidade,
      uf: empresaData.uf,
      status: 'ativo',
      prontuario: false
    };
  }
};

export default companiesService;