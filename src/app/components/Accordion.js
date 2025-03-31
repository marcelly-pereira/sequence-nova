import React from 'react';

const Accordion = ({ sections, onToggleSection, emptyStateMessage, emptyStateSubMessage }) => {
  return (
    <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {sections.map((section, index) => (
        <div key={section.id} className={index > 0 ? "border-t border-gray-200" : ""}>
          <div 
            className="flex items-center p-4 cursor-pointer"
            onClick={() => onToggleSection(section.id)}
          >
            <div className="mr-3">
              {section.icon}
            </div>
            <span className="text-gray-800 font-medium">{section.title}</span>
            <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{section.count}</span>
            <div className="ml-auto">
              <svg 
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${section.expanded ? 'rotate-180' : ''}`}
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
              section.expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-gray-100 py-8 border-t">
              {section.items && section.items.length > 0 ? (
                <div className="p-6 border-t border-gray-100">
                  <ul>
                    {section.items.map(item => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p>{emptyStateMessage || "Nenhum item configurado"}</p>
                  {emptyStateSubMessage && <p>{emptyStateSubMessage}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;