const API_URL = 'https://comercial.sequence.app.br/api';

export const fetchCardsTarefasAVencer = async () => {
  try {
    const response = await fetch(`${API_URL}/cards_tarefas_a_vencer/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar tarefas a vencer:', error);
    return { results: [] };
  }
};