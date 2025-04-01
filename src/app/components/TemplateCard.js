import React from 'react';
import Button from './Button';

export const GridIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
  </svg>
);

export const DocumentIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
);

const TemplateCard = ({ 
  title,
  icon,
  department,
  isCreateTemplate = false, 
  onClick = () => {} 
}) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <span className="font-medium text-gray-800">{title}</span>
      </div>

      <div className="bg-gray-100 rounded-full py-1 px-1 inline-block">
        <span className="text-xs text-gray-600">
          {isCreateTemplate ? "Novo Template" : department}
        </span>
      </div>
      
      {isCreateTemplate ? (
        <>
          <p className="text-sm text-gray-600 text-left my-4">
            Clique aqui para começar a criar uma nova sequência.
          </p>
          
          <Button 
            variant="primary"
            onClick={onClick}
            className="w-full p-2"
          >
            Criar Sequência
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 text-left my-4">
            Ver mais
          </p>
          
          <Button 
            variant="primary"
            onClick={onClick}
            className="w-full p-2"
          >
            Usar
          </Button>
        </>
      )}
    </div>
  );
};

export default TemplateCard;