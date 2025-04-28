const BASE_URL = 'https://comercial.sequence.app.br/api';

export const departmentService = {
  listarDepartamentos: async () => {
    try {
      const response = await fetch(`${BASE_URL}/departamentos/`);
      if (!response.ok) {
        throw new Error(`Erro ao listar departamentos: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Falha ao buscar departamentos:', error);
      throw error;
    }
  },

  buscarDepartamento: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/departamento/${id}/`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar departamento: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Falha ao buscar departamento ${id}:`, error);
      throw error;
    }
  },

  cadastrarDepartamento: async (dados) => {
    try {
      const response = await fetch(`${BASE_URL}/departamento/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro ao cadastrar departamento: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Falha ao cadastrar departamento:', error);
      throw error;
    }
  },

  atualizarDepartamento: async (id, dados) => {
    try {
      const response = await fetch(`${BASE_URL}/departamento/${id}/edit/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Erro ao atualizar departamento: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Falha ao atualizar departamento ${id}:`, error);
      throw error;
    }
  },

  excluirDepartamento: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/departamento/${id}/edit/`, {
        method: 'DELETE', 
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir departamento: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error(`Falha ao excluir departamento ${id}:`, error);
      throw error;
    }
  },
};
