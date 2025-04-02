import React, { useState, useEffect } from 'react';

const FormModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  fields, 
  primaryColor = '#0052cc'
}) => {
  const [formData, setFormData] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);

  // Cores disponíveis para seleção
  const colorOptions = [
    { id: 'blue-dark', color: '#0052cc' },
    { id: 'blue-medium', color: '#4c94ff' },
    { id: 'blue-light', color: '#b3d1ff' },
    { id: 'purple-dark', color: '#6b21a8' },
    { id: 'purple-light', color: '#d8b4fe' }
  ];

  // Efeito para gerenciar o scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Manipula mudanças nos campos do formulário
  const handleChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value
    });
  };

  // Manipula o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      color: selectedColor
    });
  };

  // Manipula seleção de cor
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // Verifica se há campos obrigatórios não preenchidos
  const isFormValid = () => {
    // Verifica cada campo obrigatório
    const requiredFields = fields.filter(field => field.required);
    
    for (const field of requiredFields) {
      // Verifica campos de texto e select
      if (field.type !== 'color' && !formData[field.id]) {
        return false;
      }
      
      // Verifica campo de cor
      if (field.type === 'color' && !selectedColor) {
        return false;
      }
    }
    
    return true;
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl relative z-10">
        <div className="p-4 flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-medium">{title}</h2>
          <button 
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-4 pb-4 space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {field.type === 'select' && field.options && (
                  <div className="relative">
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors pr-10 appearance-none bg-white"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      required={field.required}
                    >
                      <option value="" disabled>Selecione...</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg 
                        className="w-5 h-5 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
                
                {field.type === 'color' && (
                  <div>
                    <div className="flex space-x-2">
                      {colorOptions.map((colorOpt) => (
                        <button
                          key={colorOpt.id}
                          type="button"
                          className={`w-10 h-10 rounded ${selectedColor === colorOpt.color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                          style={{ backgroundColor: colorOpt.color }}
                          onClick={() => handleColorSelect(colorOpt.color)}
                        />
                      ))}
                    </div>
                    {field.required && (
                      <p className="text-xs mt-2 text-gray-500">Obrigatório a escolha de uma cor.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 p-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-4 py-2 rounded-md text-sm font-medium text-white flex items-center ${
                isFormValid() 
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
                  : 'bg-blue-300 cursor-not-allowed opacity-50'
              }`}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;