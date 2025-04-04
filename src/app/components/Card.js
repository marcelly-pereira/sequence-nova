import React from 'react';
import CardPropTypes from '../../types/CardPropTypes'

const Card = ({ 
  title = "Solicitações de Suporte",
  subtitle = "Controladoria", 
  count = 46
}) => {
  return (
    <div className="bg-white rounded-lg border p-6 w-80 h-60 flex flex-col justify-around">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-[#F3F4F6] rounded-md flex items-center justify-center">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">{subtitle}</span>
        <span className="text-xs font-medium">{count} Cards</span>
      </div>
    </div>
  );
};

Card.propTypes = CardPropTypes;

export default Card;