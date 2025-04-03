import React from 'react';

export const Input = ({ 
    id,
    type = 'text',
    name,
    label,
    required = false,
    placeholder = '',
    value,
    onChange,
    className = ''
}) => {
    return (
        <div className="mb-3">
            {label && (
                <label htmlFor={id} className="block font-medium text-gray-700 mb-1 text-sm">
                    {required && '*\u00A0'}{label}:
                </label>
            )}
            <input
                id={id}
                type={type}
                name={name || id}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md text-sm
                          focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                          transition-colors ${className}`}
            />
        </div>
    );
};

export default Input;