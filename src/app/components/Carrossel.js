import React from 'react';

export const TemplateStatic = () => {
  const template = {
    src: "/static/assets/images/templates/vendasenegociacoes.png",
    alt: "Template de Vendas e Negociações"
  };

  return (
    <div>
      <img
        src={template.src}
        alt={template.alt}
        className="w-3xs object-contain"
      />
    </div>
  );
};