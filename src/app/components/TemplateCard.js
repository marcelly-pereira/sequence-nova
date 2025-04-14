import React, { useState } from 'react';
import Button from './Button';

export const GridIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

export const DocumentIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const departmentStyles = {
  default: {
    iconBg: 'bg-[#2979ff]',
    cardBorder: 'border-[#2979ff]',
    tagBg: 'bg-[#2979ff]/10',
    tagText: 'text-[#2979ff]',
    iconColor: 'text-[#2979ff]',
    buttonBg: 'bg-[#2979ff]/10',
    buttonText: 'text-[#2979ff]',
    buttonBorder: 'border-[#2979ff]/30',
    buttonHover: 'hover:bg-[#2979ff] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#2979ff]/10',
  },
  Comercial: {
    iconBg: 'bg-[#e11970]',
    cardBorder: 'border-[#e11970]',
    tagBg: 'bg-[#e11970]/10',
    tagText: 'text-[#e11970]',
    iconColor: 'text-[#e11970]',
    buttonBg: 'bg-[#e11970]/10',
    buttonText: 'text-[#e11970]',
    buttonBorder: 'border-[#e11970]/30',
    buttonHover: 'hover:bg-[#e11970] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#e11970]/10',
  },
  Marketing: {
    iconBg: 'bg-[#4b5863]',
    cardBorder: 'border-[#4b5863]',
    tagBg: 'bg-[#4b5863]/10',
    tagText: 'text-[#4b5863]',
    iconColor: 'text-[#4b5863]',
    buttonBg: 'bg-[#4b5863]/10',
    buttonText: 'text-[#4b5863]',
    buttonBorder: 'border-[#4b5863]/30',
    buttonHover: 'hover:bg-[#4b5863] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#4b5863]/10',
  },
  Contabil: {
    iconBg: 'bg-[#2837de]',
    cardBorder: 'border-[#2837de]',
    tagBg: 'bg-[#2837de]/10',
    tagText: 'text-[#2837de]',
    iconColor: 'text-[#2837de]',
    buttonBg: 'bg-[#2837de]/10',
    buttonText: 'text-[#2837de]',
    buttonBorder: 'border-[#2837de]/30',
    buttonHover: 'hover:bg-[#2837de] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#2837de]/10',
  },
  Fiscal: {
    iconBg: 'bg-[#6a7f0b]',
    cardBorder: 'border-[#6a7f0b]',
    tagBg: 'bg-[#6a7f0b]/10',
    tagText: 'text-[#6a7f0b]',
    iconColor: 'text-[#6a7f0b]',
    buttonBg: 'bg-[#6a7f0b]/10',
    buttonText: 'text-[#6a7f0b]',
    buttonBorder: 'border-[#6a7f0b]/30',
    buttonHover: 'hover:bg-[#6a7f0b] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#6a7f0b]/10',
  },
  Controladoria: {
    iconBg: 'bg-[#01828e]',
    cardBorder: 'border-[#01828e]',
    tagBg: 'bg-[#01828e]/10',
    tagText: 'text-[#01828e]',
    iconColor: 'text-[#01828e]',
    buttonBg: 'bg-[#01828e]/10',
    buttonText: 'text-[#01828e]',
    buttonBorder: 'border-[#01828e]/30',
    buttonHover: 'hover:bg-[#01828e] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#01828e]/10',
  },
  Legal: {
    iconBg: 'bg-[#d00000]',
    cardBorder: 'border-[#d00000]',
    tagBg: 'bg-[#d00000]/10',
    tagText: 'text-[#d00000]',
    iconColor: 'text-[#d00000]',
    buttonBg: 'bg-[#d00000]/10',
    buttonText: 'text-[#d00000]',
    buttonBorder: 'border-[#d00000]/30',
    buttonHover: 'hover:bg-[#d00000] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#d00000]/10',
  },
  Administrativo: {
    iconBg: 'bg-[#008a0b]',
    cardBorder: 'border-[#008a0b]',
    tagBg: 'bg-[#008a0b]/10',
    tagText: 'text-[#008a0b]',
    iconColor: 'text-[#008a0b]',
    buttonBg: 'bg-[#008a0b]/10',
    buttonText: 'text-[#008a0b]',
    buttonBorder: 'border-[#008a0b]/30',
    buttonHover: 'hover:bg-[#008a0b] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#008a0b]/10',
  },
  Desenvolvimento: {
    iconBg: 'bg-[#00bfa5]',
    cardBorder: 'border-[#00bfa5]',
    tagBg: 'bg-[#00bfa5]/10',
    tagText: 'text-[#00bfa5]',
    iconColor: 'text-[#00bfa5]',
    buttonBg: 'bg-[#00bfa5]/10',
    buttonText: 'text-[#00bfa5]',
    buttonBorder: 'border-[#00bfa5]/30',
    buttonHover: 'hover:bg-[#00bfa5] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#00bfa5]/10',
  },
  'Deploy e Testes': {
    iconBg: 'bg-[#a200f2]',
    cardBorder: 'border-[#a200f2]',
    tagBg: 'bg-[#a200f2]/10',
    tagText: 'text-[#a200f2]',
    iconColor: 'text-[#a200f2]',
    buttonBg: 'bg-[#a200f2]/10',
    buttonText: 'text-[#a200f2]',
    buttonBorder: 'border-[#a200f2]/30',
    buttonHover: 'hover:bg-[#a200f2] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#a200f2]/10',
  },
  Suporte: {
    iconBg: 'bg-[#ff6f00]',
    cardBorder: 'border-[#ff6f00]',
    tagBg: 'bg-[#ff6f00]/10',
    tagText: 'text-[#ff6f00]',
    iconColor: 'text-[#ff6f00]',
    buttonBg: 'bg-[#ff6f00]/10',
    buttonText: 'text-[#ff6f00]',
    buttonBorder: 'border-[#ff6f00]/30',
    buttonHover: 'hover:bg-[#ff6f00] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#ff6f00]/10',
  },
  Operações: {
    iconBg: 'bg-[#64dd17]',
    cardBorder: 'border-[#64dd17]',
    tagBg: 'bg-[#64dd17]/10',
    tagText: 'text-[#64dd17]',
    iconColor: 'text-[#64dd17]',
    buttonBg: 'bg-[#64dd17]/10',
    buttonText: 'text-[#64dd17]',
    buttonBorder: 'border-[#64dd17]/30',
    buttonHover: 'hover:bg-[#64dd17] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#64dd17]/10',
  },
  Tecnologia: {
    iconBg: 'bg-[#009dff]',
    cardBorder: 'border-[#009dff]',
    tagBg: 'bg-[#009dff]/10',
    tagText: 'text-[#009dff]',
    iconColor: 'text-[#009dff]',
    buttonBg: 'bg-[#009dff]/10',
    buttonText: 'text-[#009dff]',
    buttonBorder: 'border-[#009dff]/30',
    buttonHover: 'hover:bg-[#009dff] hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-[#009dff]/10',
  },
};

const TemplateCard = ({
  title,
  icon,
  department,
  description,
  isCreateTemplate = false,
  onClick = () => { }
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const style = department ? departmentStyles[department] || departmentStyles.default : departmentStyles.default;

  const createCardStyle = {
    iconBg: 'bg-blue-700',
    cardBorder: 'border border-blue-700',
    tagBg: 'bg-blue-50',
    tagText: 'text-blue-700',
    buttonBg: 'bg-blue-100',
    buttonText: 'text-blue-700',
    buttonBorder: 'border-blue-300',
    buttonHover: 'hover:bg-blue-700 hover:text-white hover:bg-opacity-70',
    cardHover: 'hover:bg-blue-100',
  };

  const currentStyle = isCreateTemplate ? createCardStyle : style;

  return (
    <div 
      className={`bg-white rounded-lg border ${currentStyle.cardBorder} p-5 transition-all duration-700 hover:shadow-md ${isHovered ? currentStyle.cardHover : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-8 h-8 ${currentStyle.iconBg} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-base font-semibold text-gray-800">{title}</span>
      </div>

      <div className={`${currentStyle.tagBg} rounded-full py-1 px-3 inline-block mb-3`}>
        <span className={`text-xs font-medium ${currentStyle.tagText}`}>
          {isCreateTemplate ? "Novo Template" : department}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        {description || (isCreateTemplate
          ? "Clique aqui para criar uma nova sequência."
          : `Template para ${title.toLowerCase()}.`)}
      </p>

      {isCreateTemplate ? (
        <Button onClick={onClick} className="w-full text-sm py-[0.45rem] px-2 shadow-sm">
          Criar Sequência
        </Button>
      ) : (
        <button
          onClick={onClick}
          className={`
            w-full text-sm py-[0.45rem] px-2 shadow-sm rounded-md border transition-colors
            ${currentStyle.buttonBg} ${currentStyle.buttonText} ${currentStyle.buttonBorder} ${currentStyle.buttonHover}
          `}
        >
          Usar
        </button>
      )}
    </div>
  );
};

export default TemplateCard;