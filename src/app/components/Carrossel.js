import React, { useState, useEffect } from 'react';

const TEMPLATES = [
  {
    src: "/static/assets/images/templates/vendasenegociacoes.png",
    alt: "Template de Vendas e Negociações"
  },
  {
    src: "/static/assets/images/templates/legalizacao.png",
    alt: "Template de Recursos Humanos"
  },
  {
    src: "/static/assets/images/templates/ordemdeservicos.png",
    alt: "Template de Atendimento ao Cliente"
  }
];

const SLIDE_INTERVAL = 3000;

export const TemplateStatic = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TEMPLATES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {TEMPLATES.map((template, index) => (
          <div key={index} className="flex-none w-full">
            <img
              src={template.src}
              alt={template.alt}
              className="w-3xs object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateStatic;