import React, { useState, useRef, useEffect } from 'react';
import { FiFile, FiCheck, FiClock } from 'react-icons/fi';
import { IoCloudUploadOutline } from 'react-icons/io5';
import OffCanvas from '../../../../app/components/OffCanvas';
import { Button } from '../../../../app/components/Button';

const RecorrentOffCanvas = ({ isOpen, onClose, item, onStatusChange }) => {
  const [activeTab, setActiveTab] = useState('obrigacao');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (item) {
      setActiveTab('obrigacao');
      setSelectedFile(null);
      setUploadProgress(0);
      setUploadComplete(false);
    }
  }, [item]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadProgress(0);
      setUploadComplete(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadComplete(true);
            if (item && onStatusChange) {
              onStatusChange(item.id, "Entregue");
            }
          }, 500);
          return 100;
        }

        return newProgress;
      });
    }, 300);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setUploadComplete(false);
  };

  const tabs = [
    { id: 'obrigacao', label: 'Obrigação' },
    { id: 'email', label: 'E-mails' },
    { id: 'arquivos', label: 'Arquivos' },
    { id: 'registro', label: 'Registro' }
  ];

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarCompetencia = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${mes}/${ano}`;
  };

  const gerarIniciais = (nome) => {
    if (!nome) return '';
    return nome
      .split('|')[0]
      .trim()
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (!item) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'obrigacao':
        return (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Dados da Obrigação</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-100 space-y-3">
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Id:</p>
                <p className="text-sm">{item?.id || '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Razão social:</p>
                <p className="text-sm">{item?.razao_social || '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Nome departamento:</p>
                <p className="text-sm">{item?.nome_departamento || '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Obrigação:</p>
                <p className="text-sm">{item?.obrigacao_nome || '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Prazo legal:</p>
                <p className="text-sm">{item?.prazo_legal ? formatarData(item.prazo_legal) : '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Prazo tec:</p>
                <p className="text-sm">{item?.prazo_tec ? formatarData(item.prazo_tec) : '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Responsável prazo:</p>
                <p className="text-sm">{item?.responsavel_prazo || '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Responsável:</p>
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-2">
                    {gerarIniciais(item?.responsavel_nome)}
                  </div>
                  <span className="text-sm">{item?.responsavel_nome || '—'}</span>
                </div>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Status:</p>
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item?.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                    item?.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                  }`}>
                  {item?.status || '—'}
                </span>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Competência:</p>
                <p className="text-sm">{item?.competencia ? formatarCompetencia(item.competencia) : '—'}</p>
              </div>
              <div className="flex">
                <p className="text-xs text-gray-500 w-32">Atrasada:</p>
                <p className={`text-sm ${item?.atrasada ? 'text-red-600' : 'text-green-600'}`}>
                  {item?.atrasada ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">E-mails enviados à Empresa</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-xs text-gray-500 mb-2">Para: {item?.razao_social || 'Empresa'}</p>
                <div className="text-sm font-medium">{item?.obrigacao_nome || '—'}</div>
                <div className="text-sm text-gray-600">Lembrete de obrigação fiscal</div>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date().toISOString().split('T')[0]}
                </div>
              </div>
            </div>
          </div>
        );
      case 'arquivos':
        return (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Selecione um arquivo:</h3>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="text-center py-6">
                <p className="text-sm text-gray-500 mb-2">Clique abaixo para adicionar um arquivo</p>
                <div
                  className={`border-2 border-dashed ${selectedFile ? 'border-blue-200' : 'border-gray-200'} rounded-lg p-8 mb-4 cursor-pointer hover:bg-gray-50 transition-colors`}
                  onClick={triggerFileInput}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center mb-2 w-12 h-12 rounded-full bg-blue-100 text-blue-600">
                        <FiFile size={24} />
                      </div>
                      <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      {(isUploading || uploadComplete) && (
                        <div className="w-full mt-4 bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${uploadComplete ? 'bg-green-600' : 'bg-blue-600'}`}
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                      {uploadComplete && (
                        <p className="text-xs text-green-600 mt-2 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Upload concluído
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-center mb-2">
                        <IoCloudUploadOutline size={40} className="text-gray-300" />
                      </div>
                      <p className="text-sm text-gray-400">Clique aqui para selecionar um arquivo</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading || uploadComplete}
                  >
                    {isUploading ? 'Enviando...' : 'Enviar'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={!selectedFile || isUploading}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'registro':
        return (
          <div className="p-4">
            <div className="flex mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <span>{gerarIniciais(item?.responsavel_nome) || 'D'}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm">Departamento Responsável: {item?.nome_departamento || 'Canal'}</p>
                <p className="text-sm text-blue-600">Registre aqui...</p>
              </div>
            </div>
            <textarea
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors"
              rows={4}
              placeholder="Adicione observações ou registros sobre esta tarefa..."
            />
            <div className="mt-2 flex justify-end">
              <Button variant="primary" size="sm">
                Salvar registro
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <OffCanvas isOpen={isOpen} onClose={onClose} title='Detalhes'>
      <div>
        <div className="flex border-b bg-white">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm flex-1 ${activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                  : 'text-gray-600'
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {renderTabContent()}
        </div>
      </div>
    </OffCanvas>
  );
};

export default RecorrentOffCanvas;