const API_BASE_URL = 'https://comercial.sequence.app.br/api';

export const fetchDepartamentos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listadepartamento/`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar departamentos: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na API de departamentos:', error);
    throw error;
  }
};

export const fetchSequencias = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sequencias/`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar sequências: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro na API de sequências:', error);
    throw error;
  }
};

export const fetchSequenciasByDepartamento = async (departamentoId) => {
  try {
    const sequencias = await fetchSequencias();
    return sequencias.filter(seq => seq.departamento === departamentoId);
  } catch (error) {
    console.error(`Erro ao buscar sequências do departamento ${departamentoId}:`, error);
    throw error;
  }
};

export const fetchSequenciaById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sequencias/${id}/`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar sequência: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar sequência ID ${id}:`, error);
    throw error;
  }
};

export const createSequencia = async (sequenciaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sequencias/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sequenciaData),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao criar sequência: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar sequência:', error);
    throw error;
  }
};

export const updateSequencia = async (id, sequenciaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sequencias/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sequenciaData),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao atualizar sequência: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar sequência ID ${id}:`, error);
    throw error;
  }
};

export const deleteSequencia = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sequencias/${id}/`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao excluir sequência: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Erro ao excluir sequência ID ${id}:`, error);
    throw error;
  }
};