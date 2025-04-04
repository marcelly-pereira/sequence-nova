import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiSearch, FiUser, FiChevronDown } from 'react-icons/fi';

const SelectResponsible = ({
    id,
    name,
    label,
    value = [],
    onChange,
    required = false,
    placeholder = 'Selecionar responsável',
    options = [],
    className = ''
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const searchInputRef = useRef(null);

    const optionsWithAvatars = options.map(option => ({
        ...option,
        avatar: `https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=12`
    }));

    const filteredOptions = optionsWithAvatars.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeResponsible = (valueToRemove) => {
        const newValue = value.filter(v => v !== valueToRemove);
        onChange(newValue);
    };

    const toggleOption = (optionValue) => {
        if (value.includes(optionValue)) {
            removeResponsible(optionValue);
        } else {
            onChange([...value, optionValue]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const selectedOptions = optionsWithAvatars.filter(option =>
        value.includes(option.value)
    );

    const closeDropdown = () => {
        setIsDropdownOpen(false);
        setSearchTerm('');
    };

    return (
        <div className="mb-3 relative">
            {label && (
                <label
                    htmlFor={id}
                    className="block font-medium text-gray-700 mb-1 text-sm"
                >
                    {required && '*\u00A0'}{label}:
                </label>
            )}

            <div className="relative">
                <div
                    ref={buttonRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`text-sm w-full px-4 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-1 focus:ring-blue-500/25 focus:border-blue-700 
                    transition-colors cursor-pointer bg-white flex justify-between items-center ${className}`}
                >
                    <span className="block truncate">
                        {value.length > 0
                            ? `${value.length} responsável(is) selecionado(s)`
                            : placeholder}
                    </span>
                    <div className="pointer-events-none">
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

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.div
                            ref={dropdownRef}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-xl max-h-96 overflow-hidden border"
                            style={{ minWidth: '296px' }}
                        >
                            <div className="p-2 border-gray-200">
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <FiSearch className="h-4 w-4 text-gray-400 stroke-1" />
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        className="block text-sm w-full px-4 py-1 border border-gray-300 
                                        rounded-full focus:outline-none focus:ring-1 
                                        focus:ring-blue-500/25 focus:border-blue-700 transition-colors"
                                        placeholder="Pesquisar pessoas"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-y-auto" style={{ maxHeight: '220px' }}>
                                {filteredOptions.length > 0 ? (
                                    <ul className="py-1">
                                        {filteredOptions.map((option) => (
                                            <li key={option.value}>
                                                <button
                                                    type="button"
                                                    className={`w-full text-left px-3 py-2 flex items-center space-x-3 hover:bg-gray-100 transition-colors ${value.includes(option.value) ? 'bg-blue-50' : ''
                                                        }`}
                                                    onClick={() => toggleOption(option.value)}
                                                >
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={option.avatar}
                                                            alt={option.label}
                                                            className="h-5 w-5 rounded-full"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-medium text-gray-900 truncate">
                                                            {option.label}
                                                        </p>
                                                    </div>
                                                    {value.includes(option.value) && (
                                                        <div className="flex-shrink-0">
                                                            <div className="h-5 w-5 rounded-full  flex items-center justify-center">
                                                                <FiCheck className="h-4 w-4 text-white stroke-2 text-blue-400" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="px-3 py-6 text-center text-sm text-gray-500">
                                        <FiUser className="mx-auto h-5 w-5 text-gray-400 mb-2 stroke-1" />
                                        <p>Nenhum responsável encontrado</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {selectedOptions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {selectedOptions.map(option => (
                            <div
                                key={option.value}
                                className="flex items-center bg-blue-50 text-gray-700 pl-2 pr-1 py-1 rounded-md text-xs"
                            >
                                <img
                                    src={option.avatar}
                                    alt={option.label}
                                    className="w-5 h-5 rounded-full mr-1"
                                />
                                {option.label}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeResponsible(option.value);
                                    }}
                                    className="ml-1 text-gray-700 focus:outline-none"
                                >
                                    <FiX className="h-4 w-4 stroke-1" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectResponsible;