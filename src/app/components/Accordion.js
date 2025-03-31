import React, { useState } from 'react';

const AccordionItem = ({ 
  id, 
  title, 
  count, 
  icon, 
  iconBgColor, 
  expanded, 
  onToggle, 
  children,
  borderTop = false 
}) => {
  return (
    <div className={borderTop ? "border-t border-gray-200" : ""}>
      <div 
        className="flex items-center p-3 cursor-pointer hover:bg-gray-50"
        onClick={() => onToggle(id)}
      >
        <div className={`w-8 h-8 rounded-md flex items-center justify-center mr-2 ${iconBgColor}`}>
          {icon}
        </div>
        <span className="text-gray-800 font-medium">{title}</span>
        <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{count}</span>
        <div className="ml-auto">
          <svg 
            className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 border-t border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ sections, onToggleSection, renderEmptyState }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {sections.map((section, index) => (
        <AccordionItem
          key={section.id}
          id={section.id}
          title={section.title}
          count={section.count}
          icon={section.icon}
          iconBgColor={section.iconBgColor}
          expanded={section.expanded}
          onToggle={onToggleSection}
          borderTop={index > 0}
        >
          {section.items && section.items.length > 0 ? (
            <ul>
              {section.items.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          ) : (
            renderEmptyState ? renderEmptyState() : (
              <div className="text-center py-10">
                <p className="text-gray-700 font-medium mb-2">Nenhum item encontrado.</p>
                <p className="text-gray-600">Não há itens para exibir nesta seção.</p>
              </div>
            )
          )}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;