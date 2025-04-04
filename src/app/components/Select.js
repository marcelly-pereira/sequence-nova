import React from 'react';

export const Select = ({
    id,
    name,
    label,
    required = false,
    placeholder = 'Selecione',
    value,
    onChange,
    options = [],
    className = ''
}) => {
    return (
        <div className="mb-3">
            {label && (
                <label htmlFor={id} className="block font-medium text-gray-700 mb-1 text-sm">
                    {required && '*\u00A0'}{label}:
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    name={name || id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                              focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                              transition-colors pr-10 appearance-none bg-white ${className}`}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
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
        </div>
    );
};

export default Select;