import React, { useState, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import BaseForm from '../../app/components/BaseForm';
import Input from '../../app/components/Input';
import colaboradoresService from '../../services/collaborators';
import { departmentService } from '../../services/department';

const FormColaborador = ({
  isOpen,
  onClose,
  onSubmit,
  colaborador = null,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    fotoPerfil: null,
    departamentos: [],
    nivel: 'Assistente',
    visao: 'Membro',
    genero: 'Masculino',
    dataNascimento: '',
    ativo: true,
    superUsuario: false,
    senha: '',
  });

  const [departamentosLista, setDepartamentosLista] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [showNomeError, setShowNomeError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);

  const fetchDepartamentos = async () => {
    setLoadingDepartamentos(true);
    try {
      const response = await departmentService.listarDepartamentos();

      if (Array.isArray(response)) {
        const departamentos = response.map(dep => ({
          id: dep.id,
          nome: dep.nome,
          selecionado: false
        }));
        setDepartamentosLista(departamentos);
      }
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error);
      setDepartamentosLista([]);
    } finally {
      setLoadingDepartamentos(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDepartamentos();
    }
  }, [isOpen]);

  useEffect(() => {
    if (colaborador) {
      // Se tiver colaborador, preenche o formulário com os dados
      setFormData({
        nome: colaborador.nome || '',
        email: colaborador.email || '',
        telefone: colaborador.telefone || '',
        fotoPerfil: null, // Não é possível setar o arquivo diretamente
        departamentos: [], // Será preenchido depois que os departamentos forem carregados
        nivel: colaborador.nivel || 'Assistente',
        visao: colaborador.visao || 'Membro',
        genero: colaborador.genero || 'Masculino',
        dataNascimento: colaborador.dataNascimento || '',
        ativo: colaborador.ativo === undefined ? true : colaborador.ativo,
        superUsuario: colaborador.superUsuario || false,
        senha: '', // Não preenchemos a senha no formulário por segurança
      });

      // Se o colaborador tiver uma foto, poderíamos exibir um preview
      if (colaborador.fotoUrl) {
        setFotoPreview(colaborador.fotoUrl);
      }
    }
  }, [colaborador]);

  // Quando os departamentos forem carregados e tivermos um colaborador,
  // atualizamos a seleção de departamentos
  useEffect(() => {
    if (colaborador && departamentosLista.length > 0 && colaborador.departamentos) {
      const depIds = Array.isArray(colaborador.departamentos) 
        ? colaborador.departamentos 
        : [colaborador.departamento];
      
      setDepartamentosLista(prev => prev.map(dep => ({
        ...dep,
        selecionado: depIds.includes(dep.id)
      })));
    }
  }, [colaborador, departamentosLista]);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = formData.email ? emailRegex.test(formData.email) : true;
    
    setIsValid(
      formData.nome.trim() !== '' && 
      (formData.email.trim() === '' || isEmailValid)
    );
    
    if (formData.nome.trim() !== '') {
      setShowNomeError(false);
    }
    
    if (formData.email.trim() === '' || isEmailValid) {
      setShowEmailError(false);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDepartamentoChange = (depId) => {
    setDepartamentosLista(prev => 
      prev.map(dep => 
        dep.id === depId 
          ? { ...dep, selecionado: !dep.selecionado } 
          : dep
      )
    );
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivoSelecionado(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setFormData(prev => ({
        ...prev,
        fotoPerfil: file
      }));
    }
  };

  const handleSubmit = async () => {
    let hasError = false;
    
    if (formData.nome.trim() === '') {
      setShowNomeError(true);
      hasError = true;
    }
    
    if (formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setShowEmailError(true);
        hasError = true;
      }
    }
    
    if (hasError) {
      return;
    }

    try {
      setLoading(true);

      // Obter os IDs dos departamentos selecionados
      const departamentosSelecionados = departamentosLista
        .filter(dep => dep.selecionado)
        .map(dep => dep.id);

      // Criar objeto FormData para enviar arquivos
      const formDataObj = new FormData();
      formDataObj.append('nome', formData.nome);
      if (formData.email) formDataObj.append('email', formData.email);
      if (formData.telefone) formDataObj.append('telefone', formData.telefone);
      formDataObj.append('nivel', formData.nivel);
      formDataObj.append('visao', formData.visao);
      formDataObj.append('genero', formData.genero);
      if (formData.dataNascimento) formDataObj.append('dataNascimento', formData.dataNascimento);
      formDataObj.append('ativo', formData.ativo);
      formDataObj.append('superUsuario', formData.superUsuario);
      
      // Adicionar departamentos como array
      departamentosSelecionados.forEach((depId, index) => {
        formDataObj.append(`departamentos[${index}]`, depId);
      });
      
      // Adicionar senha apenas se estiver preenchida
      if (formData.senha) {
        formDataObj.append('senha', formData.senha);
      }
      
      // Adicionar foto se tiver sido selecionada
      if (arquivoSelecionado) {
        formDataObj.append('fotoPerfil', arquivoSelecionado);
      }

      let result;

      if (colaborador) {
        result = await colaboradoresService.updateColaborador(
          colaborador.id,
          formDataObj,
        );
      } else {
        result = await colaboradoresService.addColaborador(
          formDataObj,
        );
      }

      onSubmit(result);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar colaborador:', error);
    } finally {
      setLoading(false);
    }
  };

  const niveis = [
    'Assistente', 
    'Colaborador', 
    'Supervisor', 
    'Gerente', 
    'Diretor', 
    'Administrador'
  ];

  const visoes = [
    'Membro',
    'Líder',
    'Gestor',
    'Administrador'
  ];

  const generos = [
    'Masculino',
    'Feminino',
    'Não Informar'
  ];

  return (
    <BaseForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={colaborador ? 'Editar Colaborador' : 'Criar Colaborador'}
      icon={<FiUser className="w-6 h-6" />}
      primaryColor="#0056d6"
      isValid={isValid}
      submitButtonText={loading ? 'Salvando...' : 'Salvar'}
      cancelButtonText="Cancelar"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative md:col-span-2">
          <Input
            id="nome"
            name="nome"
            label="Nome"
            required
            placeholder="Nome do colaborador"
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

        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Email do colaborador"
            value={formData.email}
            onChange={handleChange}
            className={showEmailError ? 'border-red-300' : ''}
          />
          {showEmailError && (
            <div className="absolute mt-[-10px] z-10 bg-[#0056d6] text-white text-xs px-2 py-1 rounded">
              Informe um email válido.
            </div>
          )}
        </div>

        <div>
          <Input
            id="telefone"
            name="telefone"
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foto de Perfil:
          </label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => document.getElementById('fotoPerfil').click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Escolher arquivo
            </button>
            <span className="text-sm text-gray-500">
              {arquivoSelecionado ? arquivoSelecionado.name : 'Nenhum arquivo escolhido'}
            </span>
            <input
              id="fotoPerfil"
              name="fotoPerfil"
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="hidden"
            />
          </div>
          {fotoPreview && (
            <div className="mt-2">
              <img
                src={fotoPreview}
                alt="Preview da foto"
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departamentos:
          </label>
          <div className="border border-gray-300 rounded-md p-4 max-h-40 overflow-y-auto">
            {loadingDepartamentos ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0056d6]"></div>
              </div>
            ) : departamentosLista.length > 0 ? (
              departamentosLista.map((dep) => (
                <div key={dep.id} className="flex items-center mb-2 last:mb-0">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id={`dep-${dep.id}`}
                      checked={dep.selecionado}
                      onChange={() => handleDepartamentoChange(dep.id)}
                      className="h-4 w-4 focus:ring-gray-300 focus:ring-1 border border-gray-300 rounded appearance-none cursor-pointer checked:bg-[#0056d6] checked:border-transparent"
                    />
                    {dep.selecionado && (
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
                      htmlFor={`dep-${dep.id}`}
                      className="ml-2 block text-sm text-gray-900 cursor-pointer"
                    >
                      {dep.nome}
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 py-2">
                Nenhum departamento encontrado. Verifique a conexão com a API.
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="nivel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nível
          </label>
          <select
            id="nivel"
            name="nivel"
            value={formData.nivel}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {niveis.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="visao"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Visão
          </label>
          <select
            id="visao"
            name="visao"
            value={formData.visao}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {visoes.map((visao) => (
              <option key={visao} value={visao}>
                {visao}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="genero"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gênero
          </label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="dataNascimento"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Data de Nascimento
          </label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="ativo"
              name="ativo"
              checked={formData.ativo}
              onChange={handleChange}
              className="h-4 w-4 focus:ring-gray-300 focus:ring-1 border border-gray-300 rounded appearance-none cursor-pointer checked:bg-[#0056d6] checked:border-transparent"
            />
            {formData.ativo && (
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
              htmlFor="ativo"
              className="ml-2 block text-sm text-gray-900 cursor-pointer"
            >
              Ativo
            </label>
          </div>
        </div>

        <div>
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="superUsuario"
              name="superUsuario"
              checked={formData.superUsuario}
              onChange={handleChange}
              className="h-4 w-4 focus:ring-gray-300 focus:ring-1 border border-gray-300 rounded appearance-none cursor-pointer checked:bg-[#0056d6] checked:border-transparent"
            />
            {formData.superUsuario && (
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
              htmlFor="superUsuario"
              className="ml-2 block text-sm text-gray-900 cursor-pointer"
            >
              Status de Superusuário
            </label>
          </div>
          {formData.superUsuario && (
            <div className="mt-1 text-xs text-gray-500 ml-6">
              Indica que este usuário tem todas as permissões sem atribuí-las explicitamente.
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <Input
            id="senha"
            name="senha"
            type="password"
            label="Senha"
            placeholder={colaborador ? "••••••••••••" : "Digite uma senha"}
            value={formData.senha}
            onChange={handleChange}
          />
          {colaborador && (
            <p className="mt-1 text-xs text-gray-500">
              Deixe em branco para manter a senha atual.
            </p>
          )}
        </div>
      </div>
    </BaseForm>
  );
};

export default FormColaborador;