import React, { useRef  } from 'react';

const Accordion = ({ sections, onToggleSection, emptyStateMessage, emptyStateSubMessage }) => {
  const contentRefs = useRef({});

  return (
    <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {sections.map((section, index) => {
        if (!contentRefs.current[section.id]) {
          contentRefs.current[section.id] = React.createRef();
        }

        return (
          <div key={section.id} className={index > 0 ? "border-t border-gray-200" : ""}>
            <div 
              className="flex items-center p-2 cursor-pointer"
              onClick={() => onToggleSection(section.id)}
              aria-expanded={section.expanded}
              aria-controls={`content-${section.id}`}
              role="button"
              tabIndex="0"
            >
              <div className="mr-3">
                {section.icon}
              </div>
              <span className="text-gray-800 font-medium">{section.title}</span>
              <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{section.count}</span>
              <div className="ml-auto">
                <svg 
                  className={`w-5 h-5 text-gray-400 transform transition-transform duration-500 ease-in-out ${
                    section.expanded ? 'rotate-180' : ''
                  }`}
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
              id={`content-${section.id}`}
              aria-hidden={!section.expanded}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                section.expanded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                maxHeight: section.expanded ? `${contentRefs.current[section.id]?.current?.scrollHeight || 1000}px` : '0px',
                visibility: section.expanded ? 'visible' : 'hidden'
              }}
            >
              <div 
                ref={contentRefs.current[section.id]} 
                className="bg-gray-100 border-t"
              >
                {section.items && section.items.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {section.items}
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
        )
      })}
    </div>
  );
};

export default Accordion;