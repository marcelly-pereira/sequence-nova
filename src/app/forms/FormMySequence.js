import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BaseFormModal from '../components/BaseForm';

const FormMySequence = ({ 
  isOpen, 
  onClose, 
  onSave, 
  title, 
  fields, 
  primaryColor = '#0052cc',
  submitButtonText = 'Salvar',
  cancelButtonText = 'Cancelar'
}) => {
  const [formData, setFormData] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);

  const colorOptions = [
    { id: 'blue-dark', color: '#0052cc' },
    { id: 'blue-medium', color: '#4c94ff' },
    { id: 'blue-light', color: '#b3d1ff' },
    { id: 'purple-dark', color: '#6b21a8' },
    { id: 'purple-light', color: '#d8b4fe' }
  ];

  const handleChange = (fieldId, value) => {
    setFormData({
      ...formData,
      [fieldId]: value
    });
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      color: selectedColor
    });
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const isFormValid = () => {
    const requiredFields = fields.filter(field => field.required);
    
    for (const field of requiredFields) {
      if (field.type !== 'color' && !formData[field.id]) {
        return false;
      }
      
      if (field.type === 'color' && !selectedColor) {
        return false;
      }
    }
    
    return true;
  };

  const renderFormFields = () => {
    return fields.map((field, index) => (
      <motion.div 
        key={field.id} 
        className="space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 + index * 0.05 }}
      >
        <label className="block text-sm font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'select' && field.options && (
          <div className="relative">
            <select
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
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
            className="text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
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
              {colorOptions.map((colorOpt, colorIndex) => (
                <motion.button
                  key={colorOpt.id}
                  type="button"
                  className={`w-10 h-10 rounded ${selectedColor === colorOpt.color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  style={{ backgroundColor: colorOpt.color }}
                  onClick={() => handleColorSelect(colorOpt.color)}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + colorIndex * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            {field.required && (
              <p className="text-xs mt-2 text-gray-500">Obrigatório a escolha de uma cor.</p>
            )}
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <BaseFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={title}
      primaryColor={primaryColor}
      isValid={isFormValid()}
      submitButtonText={submitButtonText}
      cancelButtonText={cancelButtonText}
    >
      {renderFormFields()}
    </BaseFormModal>
  );
};

export default FormMySequence;