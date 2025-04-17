import React from 'react';
import { FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';

const TaskCard = ({ task, taskType }) => {
  const getImageUrl = (url) => {
    if (url && url.startsWith('/')) {
      return `https://comercial.sequence.app.br${url}`;
    }
    return url;
  };

  const getBorderColor = () => {
    switch (taskType) {
      case 'hoje':
        return 'border-[#06b6d4]';
      case 'vencidas':
        return 'border-[#ef4444]';
      case 'avencer':
      default:
        return 'border-[#eab308]';
    }
  };

  const getBadgeColor = () => {
    switch (taskType) {
      case 'hoje':
        return 'bg-[#06b6d4]';
      case 'vencidas':
        return 'bg-[#ef4444]';
      case 'avencer':
      default:
        return 'bg-[#eab308]';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border-l-2 ${getBorderColor()} p-4`}>
      <div className="flex items-center mb-3">
        <img 
          src={getImageUrl(task.responsavel_foto_perfil[0])} 
          alt={task.responsavel_nome[0]}
          className="w-6 h-6 rounded-full object-cover ring-2 ring-white mr-1"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(task.responsavel_nome[0]) + '&background=random';
          }}
        />
        <div className="flex flex-col">
          <span className="font-medium text-xs text-gray-800">
            {task.responsavel_nome[0]}
          </span>
          {task.responsavel_cargo && task.responsavel_cargo[0] && (
            <span className="text-xs text-gray-500">
              {task.responsavel_cargo[0]}
            </span>
          )}
        </div>
        <div className="ml-auto">
          <span className={`inline-block ${getBadgeColor()} text-white text-xs px-2 py-1 rounded-full font-medium`}>
            {taskType === 'vencidas' 
              ? `${task.tempo_para_vencimento || ''}` 
              : `Em ${task.tempo_para_vencimento?.split(' ')[1] || ''}h`}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-medium text-gray-800">{task.titulo}</h3>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 whitespace-normal flex-shrink-0">
            {task.fase_nome}
          </span>
        </div>
        
        <span className="text-xs text-gray-500 block">{task.sequencia_nome}</span>
      </div>
      
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center text-xs text-gray-500">
          <FiClock className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
          <span>Criado há {task.tempo_criacao}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <FiCalendar className="w-3 h-3 mr-1.5 text-gray-400 flex-shrink-0" />
          <span>
            {new Date(task.vencimento).toLocaleDateString('pt-BR').replace(/\//g, '/')} às {' '}
            {new Date(task.vencimento).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="flex items-center text-blue-500 hover:text-blue-700 text-xs font-medium transition-colors">
          Acessar
          <FiArrowRight className="w-3 h-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;