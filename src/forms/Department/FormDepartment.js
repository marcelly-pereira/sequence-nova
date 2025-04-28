import React, { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import BaseForm from '../../app/components/BaseForm';
import Input from '../../app/components/Input';
import { departmentService } from '../../services/department';
import authService from '../../services/authService';

const FormDepartment = ({
  isOpen,
  onClose,
  onSubmit,
  departamento = null,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    disponivel: true,
    responder_para: '',
    gestores: [],
  });

  const basicAuthUsername = 'comercial@admin.com';
  const basicAuthPassword = '761349852Jp!';

  const [isValid, setIsValid] = useState(false);
  const [showNomeError, setShowNomeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGestores, setLoadingGestores] = useState(false);

  const fetchColaboradores = async () => {
    setLoadingGestores(true);
    try {
      const response = await authService.fetchWithBasicAuth(
        'https://comercial.sequence.app.br/empresas/api/colaboradores',
        basicAuthUsername,
        basicAuthPassword,
      );

      if (!response.ok) {
        throw new Error(`Erro ao buscar colaboradores: ${response.status}`);
      }

      const colaboradores = await response.json();

      if (Array.isArray(colaboradores)) {
        const gestoresList = colaboradores.map((colab) => ({
          id: colab.id,
          nome: colab.nome,
          cargo: colab.cargo || '',
          nivel: colab.nivel || 'Colaborador',
          selecionado: false,
        }));

        setFormData((prev) => ({
          ...prev,
          gestores: gestoresList,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
      setFormData((prev) => ({
        ...prev,
        gestores: [],
      }));
    } finally {
      setLoadingGestores(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchColaboradores();
    }
  }, [isOpen]);

  useEffect(() => {
    if (departamento) {
      setFormData((prev) => ({
        ...prev,
        nome: departamento.nome || '',
        disponivel: departamento.solicitacoes === 'ATIVO',
        responder_para: departamento.responderPara || '',
      }));

      const fetchDepartamentoCompleto = async () => {
        try {
          const departamentoCompleto =
            await departmentService.buscarDepartamento(departamento.id);

          if (loadingGestores) {
            const checkGestoresInterval = setInterval(() => {
              if (!loadingGestores && formData.gestores.length > 0) {
                clearInterval(checkGestoresInterval);

                if (
                  departamentoCompleto &&
                  Array.isArray(departamentoCompleto.gestores)
                ) {
                  setFormData((prev) => ({
                    ...prev,
                    nome: departamentoCompleto.nome || '',
                    disponivel: departamentoCompleto.solicitacoes === 'ATIVO',
                    responder_para: departamentoCompleto.responderPara || '',
                    gestores: prev.gestores.map((gestor) => ({
                      ...gestor,
                      selecionado:
                        departamentoCompleto.gestores.some(
                          (g) => g.id === gestor.id,
                        ) || false,
                    })),
                  }));
                }
              }
            }, 500);

            setTimeout(() => clearInterval(checkGestoresInterval), 10000);
          } else if (formData.gestores.length > 0) {
            const gestoresArray =
              departamentoCompleto &&
              departamentoCompleto.gestores &&
              Array.isArray(departamentoCompleto.gestores)
                ? departamentoCompleto.gestores
                : [];

            setFormData((prev) => ({
              ...prev,
              nome: departamentoCompleto?.nome || '',
              disponivel: departamentoCompleto?.solicitacoes === 'ATIVO',
              responder_para: departamentoCompleto?.responderPara || '',
              gestores: prev.gestores.map((gestor) => ({
                ...gestor,
                selecionado:
                  gestoresArray.some((g) => g.id === gestor.id) || false,
              })),
            }));
          }
        } catch (error) {
          console.error('Erro ao buscar detalhes do departamento:', error);
        }
      };

      fetchDepartamentoCompleto();
    }
  }, [departamento, formData.gestores.length, isOpen, loadingGestores]);

  useEffect(() => {
    setIsValid(formData.nome.trim() !== '');
    if (formData.nome.trim() !== '') {
      setShowNomeError(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleGestorChange = (gestorId) => {
    setFormData((prev) => ({
      ...prev,
      gestores: prev.gestores.map((gestor) =>
        gestor.id === gestorId
          ? { ...gestor, selecionado: !gestor.selecionado }
          : gestor,
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!isValid) {
      setShowNomeError(true);
      return;
    }

    try {
      setLoading(true);

      const gestoresSelecionados = formData.gestores
        .filter((gestor) => gestor.selecionado)
        .map((gestor) => ({ id: gestor.id }));

      const departamentoData = {
        nome: formData.nome,
        solicitacoes: formData.disponivel ? 'ATIVO' : 'INATIVO',
        responder_para: formData.responder_para,
        gestores: gestoresSelecionados,
      };

      let result;

      if (departamento) {
        result = await departmentService.atualizarDepartamento(
          departamento.id,
          departamentoData,
        );
      } else {
        result = await departmentService.cadastrarDepartamento(
          departamentoData,
        );
      }

      onSubmit(result);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar departamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatGestorInfo = (gestor) => {
    if (gestor.cargo && !gestor.nome.includes(gestor.cargo)) {
      return `${gestor.nome} | ${gestor.cargo} (${gestor.nivel})`;
    }
    return `${gestor.nome} (${gestor.nivel})`;
  };

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={departamento ? 'Editar Departamento' : 'Criar Departamento'}
      icon={<FiFileText className="w-6 h-6" />}
      primaryColor="#0056d6"
      isValid={isValid}
      submitButtonText={loading ? 'Salvando...' : 'Salvar'}
      cancelButtonText="Cancelar"
    >
      <div className="relative">
        <Input
          id="nome"
          name="nome"
          label="Nome"
          required
          placeholder="Informe o nome do departamento"
          value={formData.nome}
          onChange={handleChange}
          className={showNomeError ? 'border-red-300' : ''}
        />
        {showNomeError && (
          <div className="absolute mt-[-10px] z-10 bg-[#0056d6] text-white text-xs px-2 py-1 rounded">
            Preencha este campo.
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Usuários gestores:
        </label>
        <div className="border border-gray-300 rounded-md p-4">
          {loadingGestores ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0056d6]"></div>
            </div>
          ) : formData.gestores.length > 0 ? (
            formData.gestores.map((gestor) => (
              <div key={gestor.id} className="flex items-center mb-3 last:mb-0">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id={`gestor-${gestor.id}`}
                    checked={gestor.selecionado}
                    onChange={() => handleGestorChange(gestor.id)}
                    className="h-4 w-4 focus:ring-gray-300 focus:ring-1 border border-gray-300 rounded appearance-none cursor-pointer checked:bg-[#0056d6] checked:border-transparent"
                  />
                  {gestor.selecionado && (
                    <div className="absolute pointer-events-none left-0 w-4 h-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-3 h-3 text-white fill-current"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                  )}
                  <label
                    htmlFor={`gestor-${gestor.id}`}
                    className="ml-2 block text-sm text-gray-900 cursor-pointer"
                  >
                    {formatGestorInfo(gestor)}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500 py-2">
              Nenhum colaborador encontrado. Verifique a conexão com a API.
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="disponivel"
            name="disponivel"
            checked={formData.disponivel}
            onChange={handleCheckboxChange}
            className="h-4 w-4 focus:ring-gray-300 focus:ring-1 border border-gray-300 rounded appearance-none cursor-pointer checked:bg-[#0056d6] checked:border-transparent"
          />
          <div className="absolute pointer-events-none left-0 w-4 h-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-3 h-3 text-white fill-current"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <label
            htmlFor="disponivel"
            className="ml-2 block text-sm text-gray-900 cursor-pointer"
          >
            Disponível para novas solicitações
          </label>
        </div>
      </div>

      <Input
        id="responder_para"
        name="responder_para"
        label="Responder para"
        placeholder="Informe quem o departamento responde"
        value={formData.responder_para}
        onChange={handleChange}
      />
    </BaseForm>
  );
};

export default FormDepartment;
